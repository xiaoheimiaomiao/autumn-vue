<template>
    <AutumnCrud :columns="columns" :data="data" :options="options" :page="page">

    </AutumnCrud>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";

export default {
    name: "temp",
    components: {AutumnCrud},
    data() {
        return {
            columns: [],
            data: [],
            options: {},
            page: {}
        }
    }
}
</script>
