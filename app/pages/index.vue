<template>
    <div class="noctem-page">
        <div class="grain-overlay" />
        <NoctemNav />
        <NoctemHero :content="content?.data" />
        <NoctemAbout :content="content?.data" />
        <NoctemFeaturedWorks :content="content?.data" />
        <NoctemServices :content="content?.data" />
        <NoctemClients :content="content?.data" />
        <NoctemPlans :content="content?.data" />
        <NoctemContact :content="content?.data" />
        <NoctemFooter />
    </div>
</template>

<script setup lang="ts">
import { useNoctemContent } from '~/composables/useNoctemContent'

const { data: content } = await useNoctemContent()
</script>