import { useEffect, useState } from 'react'
import './App.css'
import localForage from 'localforage'


const db = localForage.createInstance({ driver: localForage.INDEXEDDB, name: 'postcast' })

function App() {
  const [file, setFile] = useState()
  const [audio, setAudio] = useState()

  useEffect(() => {
    if (file) db.setItem('file', file)
  }, [file])

  useEffect(() => {
    async function load() {
      const a = await db.getItem('file');

      if (a) {
        setAudio(URL.createObjectURL(a))
      };
    }

    load()
  }, [])

  console.log(audio)

  return (
    <>
      <div>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <audio controls src={audio}></audio>
      </div>
    </>
  )
}

export default App
