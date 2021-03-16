<template>
    <!-- <div>
        <div
            v-if="$route.name!=='Process Payroll'"
            class="d-flex">
            <v-btn
                text
                plain
                color="primary"
                link
                :to="{name: 'Process Payroll'}"
            >
                Process Payroll
            </v-btn>
            <v-icon
                color="primary"
            >
                mdi-menu-right
            </v-icon>
            <v-btn
                text
                plain
                color="primary"
            >
                {{$route.name}}
            </v-btn>
        </div> -->
        <router-view></router-view>
    <!-- </div> -->
</template>
<script>
export default {
    
}
</script>