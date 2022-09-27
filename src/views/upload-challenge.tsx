import React from 'react';
import { Dropzone, FileItem, FileValidated } from '@dropzone-ui/react';

export function UploadChallenge() {
  const [uploadedFile, setUploadedFile] = React.useState<FileValidated>();

  const updateUploadedFile = (uploadedFiles: FileValidated[]) => {
    setUploadedFile(uploadedFiles && uploadedFiles[0]);
  };

  return (
    <div className="w-1/2 rounded-xl place-self-center">
      <div className="hover:shadow-xl my-10">
        {/*<label htmlFor="file" className="bg-gray-200 w-1/2 grid place-items-center rounded-xl hover:shadow-xl">*/}
        {/*  <div>*/}
        {/*    <span className="text-gray-400">Select Image</span>*/}
        {/*    <img src="assets/empty-image.svg" alt="image-icon" />*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input*/}
        {/*  id="file"*/}
        {/*  type="file"*/}
        {/*  className="hidden input input-bordered"*/}
        {/*  accept="image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml"*/}
        {/*  required*/}
        {/*/>*/}

        <Dropzone
          onChange={updateUploadedFile}
          value={uploadedFile ? [uploadedFile] : []}
          accept="image/png, image/jpeg, image/gif, image/jpg, image/webp, image/svg+xml"
          maxFiles={1}
          footer={false}
          header={false}
          disableScroll={true}
          backgroundColor="#EEE"
          behaviour="replace"
          view="grid"
          minHeight="20vh"
          maxHeight="20vh"
          label="Dropzone"
          textColor="black"
        >
          <FileItem {...uploadedFile} preview />
        </Dropzone>
      </div>
      <button className="uppercase w-full bg-purple-50 hover:bg-purple-600 text-purple-400 hover:text-purple-200 font-bold py-2 px-4 border-b-4 border-purple-500 hover:border-purple-900 rounded">
        Submit Challenge
      </button>
    </div>
  );
}
