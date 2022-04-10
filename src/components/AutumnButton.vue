<template>
    <Button @click="click" :type="type" :icon="icon" :disabled="disabled" :shape="shape">
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </Button>
</template>

<script>
    export default {
        name: "AutumnButton",
        props: {
            type: {
                type: String
            },
            icon: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
          return {
              shape: this.$themeSetting.button.getShape(),
              showSlot: this.$themeSetting.button.getTextShow()
          }
        },
        methods: {
            click: function (event) {
                this.$emit("click", event);
            }
        }
    }
</script>

<style scoped>

</style>