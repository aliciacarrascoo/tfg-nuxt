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
                    <NuxtLink class="nav-link" to="/headers">Análisis cabeceras mail</NuxtLink>
                    <NuxtLink class="nav-link" to="/resources">Recursos</NuxtLink>
                    <NuxtLink class="nav-link" to="/databases">Bases de datos de malware</NuxtLink>
                    <NuxtLink class="nav-link" to="/blog">Blog</NuxtLink>
                </div>
                </div>
            </nav>
        </header>
        <div>
            <slot />
        </div>
    </div>
</template>

