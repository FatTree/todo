<template>
    <div class="profolio">
        name: {{name}}<br>
        email: {{email}}<br>
        
    </div>

</template>
<script>
export default {
    name: 'Profolio',
    props: {
        name: String,
        email: String,
        count: Number,
    },
}

</script>
