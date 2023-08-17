import React, { useEffect, useRef } from "react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FullPage } from '@ckeditor/ckeditor5-html-support';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
};
function Editor({ onChange, editorLoaded, name, value }: any) {

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

export default Editor;


