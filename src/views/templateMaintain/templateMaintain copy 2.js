// <template>
//   <div class='templateMaintain'>


//     <el-button @click="query">查询</el-button>
//     111111
//     <!-- 表单 -->
//     <component :is="cForm.is" :model="cForm.model" :rules="cForm.rules">
//       <!-- 表格 -->
//       <component v-for="(item, index) in cForm.children" :key="index" :is="item.is" v-bind="item">

//         <!-- 列 -->
//         <component v-for="(item2, index2) in item.children" :key="index2" :is="item2.is" v-bind="item2">
//           <template v-for="item3 in item2.slots" :key="item3.slotName" v-slot:[item3.slotName]="slotProp">
//             <!-- <component :is='item3.is' v-bind="item3" v-on="getEventHandlers(item3, slotProp)" :prop="renderProp(item3,slotProp)" :rules="renderRules(item3)"> -->
//             <component :is='item3.is' v-bind="item3" v-on="getEventHandlers(item3, slotProp)"
//               :prop="renderProp(item3, slotProp)" :rules="renderRules(item3)">

//               <template v-for="item4 in item3.slots" :key="item4.slotName">
//                 <component :is='item4.is' v-bind="item4" v-model="slotProp.row[item3.prop]">

//                 </component>
//               </template>

//             </component>

//             <!-- <el-form-item v-if="item3.prop" :prop="'tableData.' + slotProp.$index + '.' + item3.prop" :rules="cForm.rules.aaa" class="marginBottom">
//                 <el-input v-model="slotProp.row[item3.prop]"></el-input>
//               </el-form-item> -->

//           </template>
//         </component>
//       </component>
//     </component>
//     111111
//     <!-- <component :is="cForm.is" :model="cForm.model" :rules="cForm.rules">
//     <component v-for="(child, index) in cForm.children" :key="index" :is="child.is" v-bind="child">
//       <component v-for="(grandChild, grandIndex) in child.children" :key="grandIndex" :is="grandChild.is" v-bind="grandChild">
//         <template v-if="grandChild.slots" v-for="(slotValue, slotName) in grandChild.slots" v-bind="slotValue" v-slot:[slotName]>
//           <component :is="slotValue.is" />
//         </template>
//         <template v-else-if="grandChild.prop">
//           <el-table-column v-bind="grandChild">
//             <template #default="{ scope }">
//               <el-form-item :prop="'tableData.' + scope.$index + '.' + grandChild.prop" :rules="cForm.rules[grandChild.prop]" class="marginBottom">
//                 <el-input v-model="scope.row[grandChild.prop]"></el-input>
//               </el-form-item>
//             </template>
//           </el-table-column>
//         </template>
//         <template v-else>
//           <el-table-column v-bind="grandChild" />
//         </template>
//       </component>
//     </component>
//   </component> -->

//     <!-- <el-form :rules="rules" :model="sampleForm">
//     <el-table :data="sampleForm.tableData" border style="width: 100%;margin:20px auto">
//       <el-table-column width="70">
//         <template #header>
//           <el-button icon="Plus" circle size="mini"></el-button>
//         </template>
//         <template #default="scope">
//           <el-button icon="Minus" circle size="mini"></el-button>
//         </template>
//       </el-table-column>
//       <el-table-column type="index" width="70" label="序号">
//       </el-table-column>
//       <el-table-column prop="aaa" label="日期" width="150">
//         <template #default="scope">
//           <el-form-item :prop="'tableData.' + scope.$index + '.aaa'" :rules="rules.aaa"
//             class="marginBottom">
//               <el-input v-model="scope.row.aaa"></el-input>
//           </el-form-item>
//         </template>
//       </el-table-column>
//     </el-table>
//   </el-form> -->



//   </div>
// </template>


// <script lang="ts">
// import { reactive, defineComponent } from 'vue';

// export default defineComponent({

//   setup() {
//     // define sampleForm and tableData here
//     const sampleForm = reactive({ tableData: [{ aaa: '1', bbb: '1' }, { aaa: '1', bbb: 1 }, { aaa: 1, bbb: 1 }, { aaa: 1, bbb: 1 }, { aaa: 1, bbb: 1 }] });
//     const cForm = {
//       is: 'el-form',
//       model: sampleForm,
//       rules: {
//         aaa: [
//           {
//             required: true,
//             message: "Please upload a file",
//             trigger: "blur",
//           },
//         ]
//       },
//       children: [
//         {
//           is: "el-table",
//           data: sampleForm.tableData,
//           border: true,
//           children: [
//             {
//               is: "el-table-column",
//               width: '70px',
//               slots: [
//                 {
//                   slotName: 'header',
//                   is: "el-button",
//                   icon: "Plus",
//                   circle: true,
//                   size: "mini",
//                   border: true,
//                 },
//                 {
//                   slotName: 'default',
//                   is: "el-button",
//                   icon: "Minus",
//                   circle: true,
//                   size: "mini",
//                   border: true,
//                   click: (slotProp) => {
//                     console.log(222, slotProp);
//                   }
//                 }
//               ]
//             },
//             {
//               is: "el-table-column",
//               label: '序号',
//               width: '70px',
//               type: 'index',
//             },
//             {
//               is: "el-table-column",
//               prop: 'aaa',
//               label: 'aaa',
//               slots: [
//                 {
//                   slotName: 'default',
//                   is: "el-form-item",
//                   // :prop="'tableData.' + scope.$index + '.' + grandChild.prop" :rules="cForm.rules[grandChild.prop]"
//                   prop: "aaa",
//                   rules: [
//                     {
//                       required: true,
//                       message: "Please upload a file",
//                       trigger: "blur",
//                     },
//                   ],
//                   slots: [
//                     {
//                       slotName: 'default',
//                       is: "el-input",
//                       model: "1",
//                       modelValue: "",
//                     }
//                   ]

//                 }
//               ]
//             },
//             {
//               is: "el-table-column",
//               prop: 'bbb',
//               label: 'bbb',
//             },


//             // <el-dropdown>
//             //         <el-button type="primary">
//             //           操作<el-icon class="el-icon--right">
//             //             <arrow-down />
//             //           </el-icon>
//             //         </el-button>


//             //         <template v-slot:dropdown>
//             //           <el-dropdown-item @click="btnClick(item2, scope.row)" v-for="item2 in item.operationBtn" :key="item2.id">
//             //             <span>{{ item2.label }}</span>
//             //           </el-dropdown-item>
//             //         </template>
//             //       </el-dropdown>

//           ]
//         }
//       ]
//     };

//     const getEventHandlers = (item, slotProp) => {
//       const handlers = {};
//       for (const key in item) {
//         if (item.hasOwnProperty(key) && typeof item[key] === 'function') {
//           handlers[key] = () => item[key](slotProp);
//         }
//       }
//       return handlers;
//     };

//     const query = () => {
//       console.log(cForm);
//     };

//     const renderProp = (row, slotProp) => {
//       if (row.is === 'el-form-item') {
//         // console.log('tableData.' + slotProp.$index + '.' + row.prop);
//         return 'tableData.' + slotProp.$index + '.' + row.prop;
//       }
//       return row.prop;
//     };

//     const renderRules = (row) => {
//       console.log(row)
//       return cForm.rules.aaa;
//     };

//     return {
//       cForm,
//       getEventHandlers,
//       query,
//       renderProp,
//       renderRules
//     };
//   }
// });
// </script>