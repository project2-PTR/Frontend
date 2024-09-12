import { useState } from "react";

export function ProfileEdit(){
    // 선택된 파일의 URL을 저장하는 state
    const [imageSrc, setImageSrc] = useState(null);

    // 파일 선택 시 실행되는 함수
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // 선택된 파일 가져오기
        if (file) {
            // 파일의 URL 생성
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl); // state에 URL 저장
        }
    };

    function convertImageToBytes(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            // 파일이 성공적으로 읽혔을 때 실행되는 이벤트 핸들러
            reader.onload = () => {
                // ArrayBuffer를 Uint8Array로 변환하고, 그 데이터를 바이트 배열로 변환
                const arrayBuffer = reader.result;
                const byteArray = new Uint8Array(arrayBuffer);
                resolve(byteArray);
            };
    
            // 파일 읽기에 실패했을 때 실행되는 이벤트 핸들러
            reader.onerror = () => {
                reject(new Error("Failed to read the file"));
            };
    
            // 파일을 ArrayBuffer로 읽기
            reader.readAsArrayBuffer(file);
        });
    }

    function a(file){
        setImageSrc(file);
        console.log(file)
    }

    // document.getElementById('uploadForm2').addEventListener('submit', function(event) {
    //     event.preventDefault(); // 폼의 기본 제출 동작을 막음

    //     const fileInput = document.getElementById('fileInput2');
    //     const file = fileInput.files[0];
    //     const message = document.getElementById('message2');

    //     if (!file) {
    //         message.textContent = 'Please select a file.';
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('file', file);

    //     axios.post('/upload/db', formData, {withCredentials: true})
    //     .then(response => {
    //         message.textContent = response.data;
    //         loadImageFromApi(file.name);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         message.textContent = 'Failed to upload file';
    //     });
    // });

    return <>
        <div>프로필 수정2</div>
        <input type="text" onChange={(e)=> {console.log(e)}} />
        <input type="file" accept="image/*" onChange={(e)=> {console.log(e)}} />
        
        {/* <div>
            {imageSrc && <img src={imageSrc} alt="Selected Image" style={{ maxWidth: '100%', height: 'auto' }} />}
        </div> */}
    </>

    // return <>
    //     <div>프로필 수정</div>
    //     <input type="file" id="fileInput" accept="image/*" required/>
    //     <div>
    //         <img></img>
    //     </div>
    // </>
}