<script setup>
    const { locale } = useI18n()
</script>

<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <NuxtLink class="navbar-brand px-3" to="/">MalwareScan</NuxtLink>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <NuxtLink class="nav-link" to="/logs">Análisis logs (Cortex XDR)</NuxtLink>
                    <NuxtLink class="nav-link" to="/resources">Recursos</NuxtLink>
                    <NuxtLink class="nav-link" to="/databases">{{ $t("databasesNav")}}</NuxtLink>
                    <NuxtLink class="nav-link" to="/blog">Blog</NuxtLink>
                </div>
                </div>
                <form>
                <select class="form-select" v-model="locale">
                    <option value="en">En 🇺🇸</option>
                    <option value="es">Es 🇪🇸</option>
                </select>
                </form>
            </nav>
        </header>
        <div class="p-4">
            <slot />
        </div>
    </div>
</template>

