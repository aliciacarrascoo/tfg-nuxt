<script setup>
    import { watchEffect } from 'vue';

    const supabase = useSupabaseClient() 
    const user = useSupabaseUser()

    watchEffect(
        ()=>{
            if(user.value){
               navigateTo("/") 
            }
        }
    )
    async function onLoginClick(){
       const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'github'})
       console.error(data)
    }                                                 
    </script>
<template>
    <button class="btn btn-primary" @click="onLoginClick">
       login
    </button>
</template>