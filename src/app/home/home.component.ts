import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _AuthService:AuthService) { }
  ngOnInit(): void {
    this._AuthService.DecodeUserToken()
    this.getUserNotes()
  }



  //<!=========== Add Note form ======== >////<!======== submit Notes ==========!>
  Notes:any[]=[]
  noteId:string=''
  delId:string=''

  addNoteForm: FormGroup = new FormGroup
  ({
    title:new FormControl(null,[Validators.required]),
    desc: new FormControl(null,[Validators.required])
  })

  submitNote(addNoteForm:FormGroup)
  {
    if(addNoteForm.valid)
    {
      let id:any =''
      this._AuthService.token.subscribe((res)=>{
        id = res
      })
      let data:any =
      {
        title: addNoteForm.value.title,
        desc: addNoteForm.value.desc,
        citizenID: id._id,
        token: localStorage.getItem("UserToken")
      }
      // console.log(data)
      this._AuthService.addnote(data).subscribe((result)=>{
        if (result.message == `success`)
        {
          addNoteForm.setValue({title:``,desc:``})
          this.getUserNotes()
        }
      })
    }

  }
  //<!===================================================Get Notes ==================================================!>
  getUserNotes()
  {
    let id:any =''
    this._AuthService.token.subscribe((res)=>{
      id = res
    })
    let data:any =
    {
      token:localStorage.getItem("UserToken"),
      userID:id._id
    }
    this._AuthService.getUserNotes(data).subscribe((respone)=>{
      if(respone.message == `success`)
      {
        this.Notes = respone.Notes
      }
      }
    )
  }
//<!============================================= Update Notes ================================================!>
  editNoteForm: FormGroup = new FormGroup
  ({
    title:new FormControl(null),
    desc: new FormControl(null)
  })
  upadteNotes(upadteNotes:FormGroup)
  {
    let data:any =
    {
      title:upadteNotes.value.title,
      desc:upadteNotes.value.desc,
      NoteID:this.noteId,
      token: localStorage.getItem("UserToken")
    }
    this._AuthService.upadteNotes(data).subscribe((response)=>{
      if(response.message == `updated`)
      {
        this.getUserNotes()
      }
    })
  }
//<!====================================================================================!>

saveValue()
{
  for(let i = 0 ; i < this.Notes.length; i++)
  {
    if(this.Notes[i]._id == this.noteId)
    {
      // console.log(this.Notes[i])
      this.editNoteForm.controls.title.setValue(this.Notes[i].title)
      this.editNoteForm.controls.desc.setValue(this.Notes[i].desc)
    }
  }
}


//<!======================== To get id Note =====>
  edit(noteId:any)
  {
    this.noteId = noteId
  }

//<!============================================= Delete Notes ================================================!>

deleteNote()
  {
    let option ={
      headers:new HttpHeaders({}),
      body:{
        NoteID:this.delId,
        token: localStorage.getItem("UserToken")
      }
    }
    this._AuthService.deleteNotes(option).subscribe((response)=>{
      if(response.message == "deleted")
      {
        this.getUserNotes()
      }
    })
  }
  //<!============ To get id Note ========>
  del(noteId:any)
  {
    this.delId = noteId
  }

}
