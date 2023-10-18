<script setup>
    const logs = ref("");
    const fileInput = ref(null)

    async function fileChange(){
        const file = fileInput.value?.files[0]
        if (file) {
            const contents = await file.text()
            logs.value = contents;
        }
    }
</script>

<template>
    <div class="p-4 vh-100">
        <h2 class="title mb-4">Logs</h2>
        <div class="form-group h-50 ">
            <h4 class="mb-2">Introduce logs</h4>
            <textarea class="form-control h-50" id="exampleFormControlTextarea1" v-model="logs"/>
            <div class="w-100 d-fle my-4">
                <div class="mb-2">Or import from file</div>
                <input ref="fileInput" type="file" class="form-control-file" accept=".json" @change="fileChange">
            </div>
            <button class="btn btn-primary ml-auto">{{ $t('analizeLogs') }}</button>
        </div>
    </div>
</template>