import { PngIcoConverter } from "../src/png2icojs.js";

class ConvertApp {

    btnDownload = document.querySelector("#btn-download");

    init() {
        document.querySelector("form").addEventListener("submit", e => {
            e.preventDefault();
            void this.convert();
        });
        this.btnDownload.addEventListener("click",
            () => this.onDownload());
    }

    onDownload() {
        if (!this.currBlob) { return; }

        const url = URL.createObjectURL(this.currBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "icon.ico";
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
            alert("Error converting: " + e.message);
        }
    }

}
new ConvertApp().init();