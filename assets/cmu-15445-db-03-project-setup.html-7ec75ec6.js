import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as i,c as s,a as e,d as c,w as r,b as t}from"./app-d87bac5c.js";const _={},d=e("h2",{id:"introduction",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#introduction","aria-hidden":"true"},"#"),t(" Introduction")],-1),l=e("p",null,[t("为了方便debug，我们在cmake操作之前先修改CMakeList.txt，将"),e("code",null,'set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0 -ggdb -fsanitize=${BUSTUB_SANITIZER} -fno-omit-frame-pointer -fno-optimize-sibling-calls") '),t("修改为"),e("code",null,'set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0 -ggdb")'),t("。")],-1),u=e("h2",{id:"details",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#details","aria-hidden":"true"},"#"),t(" Details")],-1),h=e("li",null,"...",-1);function m(f,p){const o=n("RouterLink");return i(),s("div",null,[d,l,u,e("ul",null,[e("li",null,[c(o,{to:"/zh/database/cmu-15445/baz.html"},{default:r(()=>[t("baz")]),_:1})]),h])])}const E=a(_,[["render",m],["__file","cmu-15445-db-03-project-setup.html.vue"]]);export{E as default};
