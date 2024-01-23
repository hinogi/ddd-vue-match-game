<script lang="ts" setup>
import { toRefs } from 'vue';

const emit = defineEmits(['closed']);

const props = defineProps({
    isShow: Boolean,
    title: String,
    text: String,
});

const { isShow, title, text } = toRefs(props);

function close() {
    emit('closed');
}
</script>

<template lang="pug">
Teleport(to="body")
    transition(name="fade")
        .modal(v-if="isShow")
            .modal__overlay
            .modal__popup
                button.modal__close(type="button" @click="close")
                    span &times;
                .modal__title(v-if="title") {{ title }}
                .modal__text(v-if="text") {{ text }}
                button.modal__btn.btn(type="button" @click="close") OK
</template>

<style lang="scss">
.modal {
    position: fixed;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
    }

    &__popup {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 320px;
        height: auto;
        border: 1px solid #999;
        background-color: #fff;
        padding: 24px 32px;
        z-index: 1;
    }

    &__close {
        position: absolute;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 28px;
        opacity: 0.5;
        right: 10px;
        top: 10px;

        &:hover {
            opacity: 1;
        }
    }

    &__btn {
        margin-top: 20px;
        align-self: center;
    }

    &__title {
        font-size: 21px;
        text-align: center;
        margin-bottom: 8px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
