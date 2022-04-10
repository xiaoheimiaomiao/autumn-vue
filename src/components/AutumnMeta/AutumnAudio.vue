<template>
    <div style="width: 100%;height: 100%">
        <AutumnButton icon="md-play" id="cover" @click="audioPlay"></AutumnButton>
        <audio :src="url" controls="controls" style="display: none" id="audio"/>
    </div>
</template>

<script>
export default {
    name: "AutumnAudio",
    props: {
        name: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            default: 'https://github.com/u3u.png'
        },
        mini: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            audio: {
                name: this.name,
                url: this.url,
                cover: this.cover,
                artist: ''
            },
            tag: false,
        }
    },
    mounted() {

    },
    methods: {
        audioPlay: function () {
            const audio = document.getElementById('audio');
            if (this.tag) {
                audio.pause();
                this.tag = false
            } else {
                audio.play();
                this.$emit('audioPlay')
                this.tag = true
            }
        }
    }
}
</script>

<style scoped>

</style>
