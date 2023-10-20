<script setup>
    const logs = ref("");
    const fileInput = ref(null)
    async function fileChange(){
        
        console.log(fileInput.value?.files)
        const file = fileInput.value?.files[0]
        if (file) {
            logs.value = await file.text()
        }
    }
</script>

<template>
  <div class="p-3 m-3"><strong>Results case: x</strong></div>
  <div class="container">
    <!------SHA256------>
    <div class="row p-3">
      <div class="col-2 align-items-center d-flex">
        <strong>SHA256</strong>
      </div>
      <div class="col-8">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="24HFIR83472DKF">
      </div>
      <div class="col-2">
        <button class="btn btn-primary ml-auto">VirusTotal</button>
      </div>
    </div>
    <!------MITRE ATT&CK------>
    <div class="row p-3">
      <div class="col-2 align-items-center d-flex">
        <strong>Mitre att&ck</strong>
      </div>
      <div class="col-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="MA1, MA2, MA3...">
      </div>
    </div>
    <!------ALERT------>
    <div class="row p-3">
      <div class="col-2 align-items-center d-flex">
        <strong>Alert</strong>
      </div>
      <div class="col-8">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Ransomware">
      </div>
      <div class="col-1 align-items-center d-flex">
        <strong>Severity</strong>
      </div>
      <div class="col-1 align-items-center d-flex">
        <span class="badge bg-warning text-dark fw-normal">Medium</span>
        <!----
        <span class="badge bg-info">Low</span>
        <span class="badge bg-danger">High</span>
        ----->
      </div>
    </div>
    <!------Alert description------>
    <div class="row p-3">
      <div class="col-2 align-items-center d-flex">
        <strong>Alert description</strong>
      </div>
      <div class="col-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Blablablablablablablalbblalbalbalb">
      </div>
    </div>
    <!------CONTEXT------>
    <div class="row p-3">
      <div class="col-2 align-items-center d-flex">
        <strong>Context</strong>
      </div>
      <div class="col-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="IP: xxxxxx, route: xxxxx">
      </div>
    </div>
    <!------RECOMENDATION------>
    <div class="row p-3">
      <div class="col-2 align-items-center d-flex">
        <strong>Recomendation</strong>
      </div>
      <div class="col-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Blablabla">
      </div>
    </div>
    <!------BUTTONS------>
    <div class="row p-3">
      <div class="col-2">
        <button class="btn btn-secondary ml-auto">BACK</button>
      </div>
      <div class="col-8"></div>
      <div class="col-2">
        <button class="btn btn-primary ml-auto">EXPORT</button>
      </div>
    </div>
  </div>
</template>