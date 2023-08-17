import React, { useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name, value }: any) {
    const start = () => {
        setTimeout(() => {
            ($('#summernote') as any).summernote({
                placeholder: 'Strat Writing here ...',
                tabsize: 2,
                height: 120,
                toolbar: [
                    ['view', ['undo', 'redo']],
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview', 'help']]
                ]
            });
        }, 500);
    }

    return (
        <>
            <input id="summernote"></input> {start()}
        </>
    );
}

export default Editor;


