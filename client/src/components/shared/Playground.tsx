import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import SelectLanguages from "./SelectLanguages";
import languages from "@/lib/languages";

const Playground: React.FC = () => {
  const [code, setCode] = useState<string | undefined>("");

  const handleChangeinCode = async (value?: string) => {
    setCode(value);
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-1 my-2">
        <p className="text-medium font-semibold">Choose Language</p>
        <SelectLanguages languages={languages} />
      </div>
      <div>
        <Editor
          height="70vh"
          defaultLanguage="javascript"
          defaultValue="// write your code here"
          theme="vs-dark"
          options={{
            fontSize: 18,
            fontFamily: "monospace",
            minimap: {
              enabled: true,
            },
            contextmenu: true,
          }}
          onChange={handleChangeinCode}
        />
      </div>
    </div>
  );
};

export default Playground;
