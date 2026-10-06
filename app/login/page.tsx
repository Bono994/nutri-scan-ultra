"use client"
import { useState } from "react"
export default function Login(){
  const [pwd,setPwd]=useState("")
  const [err,setErr]=useState(false)
  const check=()=>{
    if(pwd==="nutri2025"){
      document.cookie="nutri_auth=nutri2025; path=/; max-age=2592000"
      window.location.href="/"
    } else setErr(true)
  }
  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center">
        <h1 className="font-black text-xl mb-2">Acces Protege</h1>
        <p className="text-sm text-gray-500 mb-4">Entrez le mot de passe pour acceder</p>
        <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Mot de passe" className="w-full border rounded-full px-4 py-3 mb-3" />
        {err && <p className="text-red-500 text-sm mb-2">Mot de passe incorrect</p>}
        <button onClick={check} className="w-full bg-green-600 text-white rounded-full py-3 font-black">Entrer</button>
      </div>
    </div>
  )
}
