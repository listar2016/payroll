<template>
  <div>
    <v-item-group>
      <v-item 
        v-for="(item, index) in navigationItems"
        :key="index">
          <v-btn
            v-if="!item.children"
            text
            :to="item.path"
            height="62"
          >
            {{ item.title }}
          </v-btn>

          <v-menu 
            v-else
            offset-y
            open-on-hover
            :close-on-content-click="false"
            text
          >
            <template 
              v-slot:activator="{ on, attrs }"
            >
                <v-btn 
                  text
                  v-bind="attrs"
                  v-on="on"
                  height="62"
                >
                  {{item.title}}
                </v-btn>
            </template>
            <v-list>
              <top-sub-item
                v-for="(itm, idx) in item.children"
                :key="idx"
                :itm="itm"
              >                
              </top-sub-item>
            </v-list>
          </v-menu>
      </v-item>
    </v-item-group>
  </div>
</template>

<script>
import { routes } from "../../router/routes";
import topSubItem from "./top-sub-item"

export default {
  components: {
    "top-sub-item": topSubItem
  },
  data() {
    return {
      routes,
    };
  },
  computed: {
    navigationItems: function () {
      let list = [];
      this.routes.map(route => {
        if(route.onNavBar) list.push(route)
      })
      return list
    },
  },
};
</script>