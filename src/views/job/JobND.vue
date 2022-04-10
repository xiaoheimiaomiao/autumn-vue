/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">
        <el-form v-model="params" :label-width="100" label-position="left">
            <el-form-item label="年份">
                <el-date-picker
                    v-model="params.year"
                    type="year"
                    format="yyyy"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item  label="操作">

                    <AutumnButton  @click="download('年度报表.xls',params)" class="table-inline-button">下载</AutumnButton>

            </el-form-item>
        </el-form>

    </Layout>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/job/jobOptions";
import foreignDataOptions from "@/modules/job/jobOptions";
import http from "@/utils/http";

export default {
    name: "Job",
    components: {AutumnCrud},
    data() {
        return {
            params: {},


        }
    },
    methods: {
        download(name, data) {
            let param = data
            param.year = data.year.getFullYear()
            console.log(param)
            http.download( "/Autumn/v1/private/job/Exporttemplate",param).then((res) => {
                console.log(res)
                // if (!res) return;
                let filename = name,
                    blob = res;
                console.log(blob)
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    window.navigator.msSaveBlob(blob, filename);
                } else {

                    let blobURL = window.URL.createObjectURL(blob);
                    let tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobURL;
                    tempLink.setAttribute('download', filename);
                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank');
                    }
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobURL);
                }
            })
            //downloadFile(data, url , 'GET', name
            // )
        },
    }
}
</script>

<style scoped>

</style>
