import {useRef} from "react";
import {useRouter} from "next/navigation";
import {shallow} from "zustand/shallow";
import {useAppStore} from "@/store/slice";
import ParseXlsFile from "@/components/steps/ParseXlsFile";

const DownloadFile = () => {
    const fileInputRef = useRef();
    const router = useRouter();

    const initAllExpences = useAppStore((state) => state.initAllExpences, shallow);

    const onInputFileChange = (e) => {
        ParseXlsFile(e.target.file[0], initAllExpences);
        // router.push('/dashboard');
    }


    return (<div className="download">
            <div>
                <h4>Please, load file with expences</h4>
            </div>
            <input type="file"
                   id="file-input"
                   ref={fileInputRef}
                   accept=".xls"
                   onChange={onInputFileChange}
            />
    </div>)
};

export default DownloadFile;