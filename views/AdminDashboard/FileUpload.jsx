import React from "react";
import { Upload, message, Row, Col, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import openNotification from "../../utils/openAntdNotification";
import Papa from "papaparse"

const supportedFileFormats = ["csv"];


const props = {
    name: "file",
    multiple: false,
    showUploadList: {
        showPreviewIcon: true,
    },

    beforeUpload: (file) => {

        // console.log(file, "saghdjhdhabnajdkajdahb")
        const isLt8M = file.size / 1024 / 1024 > 8;
        if (isLt8M) {
            openNotification("error", "The file must be within 8MB.", "Size error");
        }
        return false;
    },

    accept: ".csv",
};

class FileUpload extends React.Component {



    state = {
        previewVisible: false,
        previewImage: "",
        previewTitle: "",
        fileList: [],
    };


    handleChange = async (info) => {
        var onChange = this.props.onChange


        const { status } = info.file;
        // console.log(info, "gghqsjajndsnkfjsnjfjnwejksdkjksdflsnsldkflksjnj")
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
            console.log(info.file);
        }
        if (info.fileList.length > 1) {
            openNotification("error", "only one file can be uploaded at once ");
            this.setState({ ...this.state, fileList: [] });
            return;
        } else if (
            !(supportedFileFormats.includes(info.file.name.split(".").pop()))
        ) {
            console.log(info.file.type, "info.file.type");
            openNotification(
                "error",
                "Unsupported file Format",
                `${info.file.name} dosen't have a supported file format`
            );
            return;
        } else {

            if (info.file.status !== "removed") {
                Papa.parse(info.file, {
                    complete: function (results) {

                        console.log("Finished:", results.data);
                        const cols = results.data[0];
                        const data = results.data.slice(1);
                        const json = data.map(row => {
                            let obj = {};
                            row.forEach((val, i) => {
                                obj[cols[i]] = val;
                            });
                            return obj
                        })
                        onChange(json)
                        // console.log(json, "some json");

                    }
                })
            }
            await this.setState({ fileList: info.fileList });
            console.log(info.fileList, "filelist");
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        }

        this.setState({
            ...this.state,
            fileList: info.fileList.filter((file, index) => file.size / 1024 / 1024 < 8),
        });
    };

    render() {
        const { fileList, } = this.state;
        const uploadButton = (
            <Button icon={<UploadOutlined />}>Select CSV file</Button>
        );
        return (
            <>
                <Col>
                    <Row justify="center">
                        <Col span={24} offset={0}>
                            <Upload
                                {...props}
                                onChange={this.handleChange}>
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}
export default FileUpload;
