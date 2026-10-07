"use client"
import { useEffect, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

export default function ScanPage() {
  const [result, setResult] = useState("")
  const [started, setStarted] = useState(false)

  const startScan = async () => {
    setStarted(true)
    const scanner = new Html5Qrcode("reader")
    try {
      const res = await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          setResult(decodedText)
          await scanner.stop()
          // récupère le produit sur OpenFoodFacts
          window.location.href = `/?barcode=${decodedText}`
        },
        (err) => {}
      )
    } catch (e) {
      alert("Caméra bloquée : autorise la caméra dans Chrome + il faut être en HTTPS")
      setStarted(false)
    }
  }

  return (
    <div style={{ padding: 20, textAlign: \'center\' }}>
      <h1>Scanner un produit</h1>
      <div id="reader" style={{ width: \'100%\', maxWidth: 400, margin: \'auto\' }}></div>
      
      {!started && <button onClick={startScan} style={{ padding: \'15px 30px\', background: \'black\', color: \'white\', borderRadius: 10, marginTop: 20 }}>Activer la caméra</button>}
      
      {result && <p style={{ marginTop: 20 }}>Code trouvé : <b>{result}</b></p>}
    </div>
  )
}
