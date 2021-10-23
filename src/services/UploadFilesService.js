import http from "../http-common";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/stt/lang/en", formData, {
            responseType: 'blob', // Important
            headers: {
                "Content-Type": "multipart/form-data",
                "Response-Type": ""
            },
            onUploadProgress
        });
    }

    getFiles() {
        return http.get("/time");
    }
}

export default new UploadFilesService();