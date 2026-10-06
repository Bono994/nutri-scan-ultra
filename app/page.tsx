"use client"
import { useState, useEffect } from "react"
import { Scan, History, Leaf, Search } from "lucide-react"
export default function Home(){
const [barcode,setBarcode]=useState("")
const [product,setProduct]=useState(null)
const [loading,setLoading]=useState(false)
const [history,setHistory]=useState([])
const [profil,setProfil]=useState("equilibre")
useEffect(()=>{const h=localStorage.getItem("ns_history");if(h) setHistory(JSON.parse(h))},[])
const fetchProduct=async(code)=>{
setLoading(true)
try{
const res=await fetch("https://world.openfoodfacts.org/api/v2/product/"+code+".json")
const data=await res.json()
if(data.status===1){setProduct(data.product);const newH=[data.product,...history].slice(0,20);setHistory(newH);localStorage.setItem("ns_history",JSON.stringify(newH))}else{alert("Produit non trouve. Teste 3017620422003")}
}catch(e){alert("Erreur reseau")}
setLoading(false)
}
const scorePerso=(p)=>{
let s=50
if(p.nutriscore_grade==="a") s+=30
if(p.nutriscore_grade==="b") s+=15
if(p.nutriscore_grade==="e") s-=30
if(p.nova_group===4) s-=20
if(profil==="muscu"&&p.nutriments&&p.nutriments.proteins_100g>10) s+=10
if(profil==="perte"&&p.nutriments&&p.nutriments["energy-kcal_100g"]<150) s+=10
return Math.max(0,Math.min(100,s))
}
return(
<div className="max-w-md mx-auto min-h-screen bg-white shadow-xl">
<header className="bg-green-600 text-white p-5 rounded-b-[2rem] text-center">
<h1 className="text-2xl font-black">NUTRI-SCAN ULTRA</h1>
<select value={profil} onChange={e=>setProfil(e.target.value)} className="mt-3 text-black rounded-full px-4 py-1 text-sm font-bold">
<option value="equilibre">Equilibre</option>
<option value="muscu">Prise de masse</option>
<option value="perte">Perte de poids</option>
</select>
</header>
<div className="p-4 space-y-4">
<div className="bg-slate-900 text-white p-4 rounded-2xl">
<div className="flex gap-2">
<input value={barcode} onChange={e=>setBarcode(e.target.value)} placeholder="3017620422003" className="flex-1 rounded-full px-4 py-3 text-black"/>
<button onClick={()=>fetchProduct(barcode)} className="bg-green-500 px-6 rounded-full font-black">{loading?"...":"OK"}</button>
</div>
</div>
{product&&(
<div className="border-2 border-green-100 rounded-[2rem] p-5 bg-green-50 text-center">
<img src={product.image_front_small_url} alt="" className="w-32 mx-auto"/>
<p className="font-black">{product.product_name}</p>
<p className="text-5xl font-black">{scorePerso(product)}/100</p>
</div>
)}
<div className="bg-white border rounded-2xl p-4">
<p className="font-bold">Historique ({history.length})</p>
{history.map((h,i)=>(<div key={i} className="flex gap-2 bg-slate-50 p-2 rounded-xl mt-2"><img src={h.image_front_small_url} className="w-10 h-10 rounded"/><p className="font-bold text-sm">{h.product_name}</p></div>))}
</div>
</div>
</div>
)
}
