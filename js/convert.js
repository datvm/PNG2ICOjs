import { PngIcoConverter } from "../src/png2icojs.js";

const ErrorMessages = {
    "INVALID_IMAGE": "Cannot open the PNG file, please make sure it's a valid PNG file",
    "INVALID_SIZE": "The PNG file is larger than 256px. Please check Ignore Size to proceed anyway.",
};

class ConvertApp {

    btnDownload = document.querySelector("#btn-download");

    init() {
        document.querySelector(".frm-convert").addEventListener("submit", e => {
            e.preventDefault();
            void this.convert();
        });

        document.querySelector(".frm-download").addEventListener("submit", e => {
            e.preventDefault();
            void this.onDownload();
        });
    }

    onDownload() {
        if (!this.currBlob) { return; }

        const url = URL.createObjectURL(this.currBlob);
        const a = document.createElement("a");
        a.href = url;

        const name = document.querySelector("#txt-name").value || "favicon.ico";
        a.download = name;

        a.click();
    }

    async convert() {
        const files = document.querySelector("#txt-files").files;
        if (!files.length) {
            alert("Please choose at least a file");
            return;
        }

        const converter = new PngIcoConverter();
        const ignoreSize = document.querySelector("#chk-ignore-size").checked;
        const inputs = [...files].map(file => ({
            png: file,
            ignoreSize,
        }));

        try {
            this.currBlob = await converter.convertToBlobAsync(inputs);
            this.btnDownload.removeAttribute("disabled");
        } catch (e) {
            console.error(e);

            const msg = e.message;
            if (msg) {
                alert("Error converting: " + (ErrorMessages[msg] ?? msg));
            }
        }
    }

}
new ConvertApp().init();