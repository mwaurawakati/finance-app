<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  isGranted,
  askPermission,
  sendNotificationPanda,
} from "./app/notifications";
import { SparklesIcon } from "@heroicons/vue/16/solid";
import { useRouter, useRoute } from "vue-router";
import { useAppearanceStore } from "./store/appearance";
import { useCardStore } from "./store/cards";
import { RevolutIcon } from "vue3-simple-icons";
import { ChartNoAxesCombined } from "lucide-vue-next";
import { ask } from "@tauri-apps/plugin-dialog";
import { isTauri } from "@tauri-apps/api/core";
const route = useRoute();
const router = useRouter();
const appearanceStore = useAppearanceStore();
const cardStore = useCardStore();
const openAccount = ref(false);
const openManageCard = ref(false);

function isActive(path: string) {
  return route.path === path;
}

onMounted(async () => {
  //const theme = (await get("theme")) as string;
  //if (theme) {
  appearanceStore.changeTheme("system");
  //}
  appearanceStore.changeTheme(appearanceStore.theme);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Listen for changes
  mediaQuery.addEventListener("change", (_event) => {
    appearanceStore.changeTheme("system");
  });

  let isPermissionGranted = await isGranted();
  if (isPermissionGranted) {
    sendNotificationPanda({
      title: "Deposit Successful",
      body: "Your deposit has been processed!",
      summary: "Desposit successful.",
      icon: "icon",
      autoCancel: false,
      visibility: 1,
      actionTypeId: "t2",
      largeIcon: "icon",
      channelId: "testchannel",
      largeBody:
        "We have received 1000 TMT that has been deposited to your account. We have received 1000 TMT that has been deposited to your account.We have received 1000 TMT that has been deposited to your account. We have received 1000 TMT that has been deposited to your account. We have received 1000 TMT that has been deposited to your account. We have received 1000 TMT that has been deposited to your account.",
      attachments: [
        {
          id: "a11",
          url: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
        },
      ],
    });
  } else {
    //if (!isPermissionGranted) {
    let answer: boolean;
    if (isTauri()) {
      answer = await ask(
        "Revolut would like to send you notifications. Would you like to receive notifications?",
        {
          title: "Revolut",
          kind: "info",
        }
      );
    } else {
      answer = confirm("Revolut would like to send you notifications. Would you like to receive notifications?");
    }
    console.log(answer);
    if (answer) {
      let granted = await askPermission();
      if (granted) {
        sendNotificationPanda({
          title: "Test Notification",
          body: "Tauri is awesome!",
          summary: "This is a test notification",
          icon: "icon",
          iconColor: "white",
          autoCancel: true,
          largeIcon: "icon.png",
        });
      }
    }
    //}
  }
});
</script>

<template>
  <div
    class="top-0 fixed w-full h-16 p-4 flex justify-center items-center gap-2 bg-white dark:bg-black border-grey z-100"
  >
    <OverlayBadge severity="danger">
      <Avatar
        label="U"
        @click="openAccount = true"
        class="!rounded-full dark:!text-white !w-10 !h-10 raised !border-none dark:!bg-neutral-800"
        raised
      ></Avatar>
    </OverlayBadge>
    <div class="flex grow">
      <IconField class="!w-full !rounded-full !border-none">
        <InputIcon>
          <i class="pi pi-search !text-white fill-white" />
        </InputIcon>
        <InputText
          placeholder="Search"
          class="!w-full !rounded-full !text-white !border-none !bg-neutral-800"
        />
      </IconField>
    </div>
    <div class="gap-2 flex">
      <div
        class="rounded-full dark:bg-neutral-800 w-10 flex items-center justify-center h-10"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-simple']"
          class="dark:text-white"
          size="lg"
        />
      </div>
      <div
        class="rounded-full dark:bg-neutral-800 w-10 flex items-center justify-center h-10"
      >
        <font-awesome-icon
          :icon="['fas', 'credit-card']"
          class="dark:text-white"
          size="lg"
          @click="openManageCard = true"
        />
      </div>
    </div>
  </div>
  <div
    id="nav-bar-bottom"
    class="bottom-0 fixed w-full h-20 p-0 flex justify-evenly items-center gap-0 bg-white dark:bg-[#1f1f21] z-20"
  >
    <div
      class="flex flex-col p-2 justify-center items-center"
      :class="{
        active: isActive('/'),
      }"
      @click="router.push('/')"
    >
      <RevolutIcon
        :class="
          isActive('/')
            ? 'fill-[#687DFD] !important'
            : 'fill-[#A3A1A5] dark:text-white'
        "
      />
      <span
        :class="
          isActive('/')
            ? 'text-[#687DFD] fold-bold font-bold text-sm'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5] font-bold text-sm'
        "
        >Home</span
      >
    </div>
    <div
      class="flex flex-col p-2 items-center"
      :class="{
        active: isActive('/invest'),
      }"
      @click="router.push('/invest')"
    >
      <!--font-awesome-icon
        :icon="['fas', 'chart-line']"
        :class="
          isActive('/invest')
            ? 'text-primary !important'
            : 'text-surface-700 dark:text-white'
        "
      /-->
      <ChartNoAxesCombined
        :class="
          isActive('/invest')
            ? '!text-[#687DFD]'
            : 'text-[#A3A1A5] dark:!text-[#A3A1A5]'
        "
      />
      <span
        :class="
          isActive('/invest')
            ? 'text-[#687DFD] fold-bold font-bold text-sm'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5] font-bold text-sm'
        "
        >Invest</span
      >
    </div>
    <div
      class="flex flex-col p-2"
      :class="{
        active: isActive('/payment'),
      }"
      @click="router.push('/payment')"
    >
      <font-awesome-icon
        :icon="['fas', 'arrow-right-arrow-left']"
        size="xl"
        :class="
          isActive('/payment')
            ? 'text-[#687DFD] !important'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5]'
        "
      />
      <span
        :class="
          isActive('/payment')
            ? 'text-[#687DFD] fold-bold font-bold text-sm'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5] font-bold text-sm'
        "
        >Payment</span
      >
    </div>
    <div
      class="flex flex-col p-2"
      :class="{
        active: isActive('/crypto'),
      }"
      @click="router.push('/crypto')"
    >
      <font-awesome-icon
        :icon="['fas', 'bitcoin-sign']"
        size="xl"
        :class="
          isActive('/crypto')
            ? 'text-[#687DFD] font-bold'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5]'
        "
      />
      <span
        :class="
          isActive('/crypto')
            ? 'text-[#687DFD] fold-bold font-bold text-sm'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5] font-bold text-sm'
        "
        >Crypto</span
      >
    </div>
    <div
      class="flex flex-col justify-center items-center p-2"
      :class="{
        active: isActive('/points'),
      }"
      @click="router.push('/points')"
    >
      <div class="h-[30px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          xmlns:bx="https://boxy-svg.com"
          style="height: 35px; margin: -7px"
          :class="
            isActive('/points')
              ? 'text-[#687DFD] !important'
              : 'text-[#A3A1A5] dark:text-[#A3A1A5]'
          "
        >
          <!-- Path that takes parent color -->
          <path
            d="M 320.815693412 215.16718 Q 339.73 204.247 358.644306588 215.16718 L 478.434914977 284.32832 Q 497.349221565 295.2485 497.349221565 317.08886 L 497.349221565 455.41114 Q 497.349221565 477.2515 478.434914977 488.17168 L 358.644306588 557.33282 Q 339.73 568.253 320.815693412 557.33282 L 201.025085023 488.17168 Q 182.110778435 477.2515 182.110778435 455.41114 L 182.110778435 317.08886 Q 182.110778435 295.2485 201.025085023 284.32832 Z"
            bx:shape="n-gon 339.73 386.25 182.003 182.003 6 0.12 1@71bbf27b"
            style="fill: currentColor; stroke: currentColor"
            transform="matrix(0.500309764879, 0.865846487067, -0.865846487067, 0.500309764879, 388.058405801984, -222.91483813741)"
          />

          <!-- Path that takes text color -->
          <path
            d="M 260.886 128.063 L 285.277 193.204 L 347.12 218.895 L 285.277 244.586 L 260.886 309.727 L 236.495 244.586 L 174.652 218.895 L 236.495 193.204 Z"
            bx:shape="star 260.886 218.895 86.234 90.832 0.4 4 1@c88c622e"
            style="fill: inherit; stroke: white; stroke-width: 1"
          />
        </svg>
      </div>
      <span
        style="margin-top: -5px"
        :class="
          isActive('/points')
            ? 'text-[#687DFD] fold-bold font-bold text-sm'
            : 'text-[#A3A1A5] dark:text-[#A3A1A5] font-bold text-sm'
        "
        >RevPoints</span
      >
    </div>
  </div>
  <router-view />
  <!--Account Drawer-->
  <!--Drawer
    v-model:visible="openAccount"
    header="Account Information"
    position="left"
  >
<Divider />
<div class="card flex flex-col">

</div>
</Drawer-->

  <Drawer v-model:visible="openAccount" class="">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
          <span class="inline-flex items-center gap-2">
            <font-awesome-icon
              :icon="['fas', 'florin-sign']"
              class="text-black dark:text-white mr-2"
            />
            <span class="font-semibold text-2xl text-primary">Finance App</span>
          </span>
          <span>
            <Button
              type="button"
              @click="closeCallback"
              icon="pi pi-times"
              rounded
              outlined
            ></Button>
          </span>
        </div>
        <div class="overflow-y-auto">
          <ul class="list-none p-4 m-0">
            <li>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
              >
                <span class="font-medium">PERSONAL</span>
                <i class="pi pi-chevron-down"></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">Account Info</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-bookmark mr-2"></i>
                    <span class="font-medium">Cards</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    v-styleclass="{
                      selector: '@next',
                      enterFromClass: 'hidden',
                      enterActiveClass: 'animate-slidedown',
                      leaveToClass: 'hidden',
                      leaveActiveClass: 'animate-slideup',
                    }"
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-chart-line mr-2"></i>
                    <span class="font-medium">Reports</span>
                    <i class="pi pi-chevron-down ml-auto"></i>
                  </a>
                  <ul
                    class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                  >
                    <li>
                      <a
                        v-ripple
                        v-styleclass="{
                          selector: '@next',
                          enterFromClass: 'hidden',
                          enterActiveClass: 'animate-slidedown',
                          leaveToClass: 'hidden',
                          leaveActiveClass: 'animate-slideup',
                        }"
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-chart-line mr-2"></i>
                        <span class="font-medium">Revenue</span>
                        <i class="pi pi-chevron-down ml-auto"></i>
                      </a>
                      <ul
                        class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                      >
                        <li>
                          <a
                            v-ripple
                            class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                          >
                            <i class="pi pi-table mr-2"></i>
                            <span class="font-medium">View</span>
                          </a>
                        </li>
                        <li>
                          <a
                            v-ripple
                            class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                          >
                            <i class="pi pi-search mr-2"></i>
                            <span class="font-medium">Search</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-chart-line mr-2"></i>
                        <span class="font-medium">Expenses</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <SparklesIcon
                      class="fill-black dark:fill-white size-4 mr-2"
                    />
                    <span class="font-medium">Points</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-comments mr-2"></i>
                    <span class="font-medium">Messages</span>
                    <span
                      class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full"
                      style="min-width: 1.5rem; height: 1.5rem"
                      >3</span
                    >
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-calendar mr-2"></i>
                    <span class="font-medium">Scheduled Payments</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-cog mr-2"></i>
                    <span class="font-medium">Settings</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="list-none p-4 m-0">
            <li>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
              >
                <span class="font-medium">SERVICES</span>
                <i class="pi pi-chevron-down"></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-folder mr-2"></i>
                    <span class="font-medium">Invest</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-chart-bar mr-2"></i>
                    <span class="font-medium">Crypto</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'right-left']"
                      class="text-black dark:text-white mr-2"
                    />
                    <span class="font-medium">Payment</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="mt-auto">
          <hr
            class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700"
          />
          <a
            v-ripple
            class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
          >
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
              label="U"
              class="!text-primary border"
              size="large"
              raised
            />
            <span class="font-bold">John Doe</span>
            <Button label="Logout"></Button>
          </a>
        </div>
      </div>
    </template>
  </Drawer>

  <!--Manage Cards-->
  <Drawer
    v-model:visible="openManageCard"
    header="Manage Cards"
    position="full"
    style="height: auto"
  >
    <div class="flex flex-col justify-center">
      <Button label="Add Card" @click="" />

      <div class="grow overflow-scroll">
        <DataView :value="cardStore.cards" dataKey="CVV" class="">
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div
                  class="flex flex-col sm:flex-row sm:items-center p-0 gap-4"
                  :class="{
                    'border-t border-surface-200 dark:border-surface-700':
                      index !== 0,
                  }"
                >
                  <!--div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                                <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                                    <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                                </div>
                            </div-->
                  <div
                    class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                  >
                    <div
                      class="flex flex-row md:flex-col justify-between items-center gap-2"
                    >
                      <Avatar
                        :image="`${item.Type.toLowerCase()}.png`"
                        shape="circle"
                        size="xlarge"
                      />
                      <div class="flex flex-col">
                        <div class="text-lg font-medium mt-2">
                          Card Name:{{ item.Name }}
                        </div>
                        <span
                          class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >
                          {{ `Card Number: ****${item.CardNumber.slice(-4)}` }}
                        </span>
                        <span
                          class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >
                          {{ `Expiry Date: ${item.ExpiryDay}` }}</span
                        >
                      </div>
                      <div class="p-0 h-full flex item-center justify-center">
                        <div
                          class="flex items-center gap-0 justify-center py-1 px-0"
                        >
                          <ToggleButton
                            v-model="item.ShowCVV"
                            offLabel="Show CVV"
                            :onLabel="item.CVV"
                          />

                          <span class="text-surface-900 font-bold text-lg">{{
                            item.Amount
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </Drawer>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  /*box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);*/
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }
  button:active {
    background-color: #0f0f0f69;
  }
}
</style>
