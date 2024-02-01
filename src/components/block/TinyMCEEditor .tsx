import { useEffect, useRef } from "react";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver"; // or any other theme you prefer

const TinyMCEEditor = ({
  onChange,
}: {
  onChange: (content: string) => void;
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      tinymce.init({
        selector: `#editor`,
        plugins:
          "advlist autolink lists link image charmap print preview anchor",
        toolbar:
          "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        setup: (editor) => {
          editor.on("change", () => {
            const content = editor.getContent();
            onChange(content);
          });
        },
      });
    }

    // Cleanup on unmount
    return () => {
      tinymce.remove("#editor");
    };
  }, []);

  return <textarea ref={editorRef} id="editor"></textarea>;
};

export default TinyMCEEditor;
