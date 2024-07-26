import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function TextEditor({
  name,
  control,
  label,
  defaultValue = "",
}) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="sfmehb51v1tr8p70u3fapvzwiqeuv8rcxnja2nn4ep4to2yy"
            initialValue={defaultValue}
            value={value}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link preview anchor",
                "searchreplace visualblocks code insertdatetime media table help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              branding: false,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
