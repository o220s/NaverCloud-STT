// npm i react-media-recorder@1.6.5 -> 녹음 모듈
import {useState} from 'react';
import axios from 'axios';
import {ReactMediaRecorder} from 'react-media-recorder';

function App() {
  const [resp, setResp] = useState('');

  const onSubmit = (e) =>{
    e.preventDefault();

    let formData = new FormData();
    formData.append('uploadfile', document.frm.uploadfile.files[0]);

    // send
    axios.post('http://localhost:9900/fileupload', formData)
        .then(resp=>{
          setResp(resp.data.text);
        })
        .catch(err=>{
          alert('error');
        })
  }
  return (
    <div>
      <ReactMediaRecorder
        audio
        render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button><br/><br/>
            <audio src={mediaBlobUrl} controls></audio><br/>

            {/* 다운로드 링크 */}
            <a href={mediaBlobUrl} download='my-audio-file.wav'>
              download
            </a>
          </div>
        )}/>
        <hr />
        <h2>음성파일 업로드</h2>
        
        <form name='frm' onSubmit={onSubmit} encType='multipart/form=data'>
          <input type="file" name='uploadfile' accept='*' />
          <input type="submit" value="파일전송"/>
        </form>

        <h3>결과: {resp}</h3>
    </div>
  );
}

export default App;
