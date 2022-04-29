import { useState } from 'react'
import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')

function ImageUploader() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h3>IPFS Image Upload</h3>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="200px" />
        )
      }
      <label>{fileUrl}</label>
      <label>Copy File URL and enter into the image field</label>
    </div>
  );
}

export default ImageUploader