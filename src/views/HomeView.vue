<template>
  <div
    class="top-[4rem] bottom-[4rem] absolute w-full bg-inherit p-4 flex flex-col overflow-scroll"
  >
    <div class="card !bg-inherit shadow-2xl !p-0">
      <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="swiper"
        :modules="modules"
        :pagination="{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4,
        }"
      >
        <swiper-slide
          v-for="(item, index) in accountStore.defaultAccounts"
          :key="index"
        >
          <div class="flex flex-col items-center justify-center p-4 h-[330px]">
            <div class="h-20 mb-3">
              <div class="flex gap-1 item-center justify-center">
                <div class="flex items-center"></div>
                <div class="flex items-center justify-center">
                  <Avatar image="/eur3.png" shape="circle" class="!w-6 !h-6" />
                  <p
                    class="text-surface-700 dark:text-white text-xl text-center flex items-center justify-center ml-2"
                  >
                    {{ item.Type }}
                  </p>
                </div>
                <div class="flex items-center justify-center h-full">
                  <span>.</span>
                </div>
                <p
                  class="text-surface-700 dark:text-white text-xl text-center flex items-center"
                >
                  {{ item.Name }}
                </p>
              </div>
              <span
                style="font-family: system-ui"
                class="font-black text-surface-700 text-6xl dark:text-white w-full text-center flex justify-center"
              >
                {{ Math.floor(item.Balance) }}
                <span class="text-xl flex items-end">,</span>
                <span
                  class="align-baseline inline-block flex items-end text-2xl"
                >
                  {{ item.Balance.toFixed(2).toString().split(".")[1] || "" }}
                  {{ getSymbolFromCurrency(item.Name) }}
                </span>
              </span>
            </div>
            <Button
              label="Accounts"
              rounded
              class="dark:!bg-neutral-800 !border-none dark:!text-white !px-4 !font-black mt-2"
              :dt="{
                label: {
                  font: { weight: '800' },
                },
              }"
            />
          </div>
        </swiper-slide>
      </swiper>
      <div class="flex justify-evenly">
        <div
          class="flex flex-col p-2 items-center"
          @click="openAddMoney = true"
        >
          <div
            class="rounded-full w-[60px] h-[60px] p-0 bg-slate-300 dark:bg-neutral-800 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-surface-700 dark:text-white"
              size="xl"
            />
          </div>
          <span
            class="text-surface-700 text-nowrap font-extrabold dark:text-white"
            >Add money</span
          >
        </div>
        <div class="flex flex-col p-2 items-center">
          <div
            class="rounded-full w-[60px] h-[60px] p-0 bg-slate-300 dark:bg-neutral-800 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'shuffle']"
              class="text-surface-700 dark:text-white"
              size="xl"
              flip="vertical"
            />
          </div>
          <span class="text-surface-700 font-bold dark:text-white">Move</span>
        </div>
        <div class="flex flex-col p-2 items-center">
          <div
            class="rounded-full w-[60px] h-[60px] p-0 bg-slate-300 dark:bg-neutral-800 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'building-columns']"
              class="text-surface-700 dark:text-white"
              size="xl"
            />
          </div>
          <span class="text-surface-700 font-bold dark:text-white"
            >Details</span
          >
        </div>
        <div class="flex flex-col p-2 items-center">
          <div
            class="rounded-full w-[60px] h-[60px] p-0 bg-slate-300 flex dark:bg-neutral-800 items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'ellipsis']"
              class="text-surface-700 dark:text-white"
              size="xl"
            />
          </div>
          <span class="text-surface-700 font-bold dark:text-white">More</span>
        </div>
      </div>
    </div>

    <!--Transactions-->
    <div class="grow rounded-3xl">
      <DataView
        :value="transactionStore.transactions"
        dataKey="ID"
        class="!rounded-3xl"
        :dt="dataViewDT"
      >
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                :class="{
                  'border-t border-surface-200 dark:border-surface-700':
                    index !== 0,
                }"
              >
                <div
                  class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                >
                  <div class="flex flex-row items-center gap-2">
                    <img
                      :src="item.Image"
                      size="large"
                      shape="circle"
                      class="!w-[70px] !h-[70px] rounded-full"
                    />
                    <div class="grow">
                      <div class="text-lg font-medium mt-2 grow">
                        {{ formatTransactiontext(item) }}
                      </div>
                      <span
                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >{{ formatRelativeTime(item.Date) }}</span
                      >
                    </div>
                    <div
                      class="p-1 h-full flex item-center justify-center"
                      style="border-radius: 30px"
                    >
                      <div
                        class="flex items-center gap-2 justify-center py-1 px-2"
                        style="
                          border-radius: 30px;
                          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                        "
                      >
                        <span class="dark:text-white font-bold text-lg">
                          {{ formatCurrency(item) }}
                        </span>
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

  <!--Add money-->
  <Drawer
    v-model:visible="openAddMoney"
    header="Add Money"
    position="full"
    style="height: auto"
  >
    <div class="flex flex-col h-full">
      <div class="grow flex flex-col gap-4">
        <!--card type-->
        <Select
          v-model="selectedCard"
          :options="cardStore.cards"
          filter
          optionLabel="name"
          placeholder="Select a Country"
          class="w-full md:w-56 !border-primary !rounded"
          :dt="selectDT"
        >
          <template #dropdownicon>
            <Button label="Change" />
          </template>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <img
                :alt="slotProps.value"
                :src="`${slotProps.value.Type.toLowerCase()}.png`"
                :class="`mr-2`"
                style="width: 18px"
              />
              <div class="flex flex-col">
                <span>{{ slotProps.value.BankName }}</span>
                <span
                  >{{ slotProps.value.Type }}***{{
                    slotProps.value.CardNumber.slice(-4)
                  }}</span
                >
              </div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <img
                :alt="slotProps.option.Name"
                :src="`${slotProps.option.Type.toLowerCase()}.png`"
                :class="`mr-2`"
                style="width: 18px"
              />
              <div class="flex flex-col">
                <span>{{ slotProps.option.BankName }}</span>
                <span
                  >{{ slotProps.option.Type }}***{{
                    slotProps.option.CardNumber.slice(-4)
                  }}</span
                >
              </div>
            </div>
          </template>
        </Select>
        <div
          class="w-full my-[-15px] flex justify-center z-10"
          style="margin-top: -25px; margin-bottom: -25px"
        >
          <Button icon="pi pi-arrow-down" rounded />
        </div>
        <div class="flex gap-2 p-4 border border-solid border-primary">
          <Select
            v-model="selectedAccount"
            :options="accountStore.defaultAccounts"
            filter
            optionLabel="name"
            placeholder="Select a Country"
            class="w-full md:w-56"
            fluid
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <!--img
              :alt="slotProps.value"
              :src="`${slotProps.value.Type.toLowerCase()}.png`"
              :class="`mr-2`"
              style="width: 18px"
            /-->
                <div class="flex flex-col">
                  <span>{{ slotProps.value.Name }}</span>
                  <span>Balance: {{ slotProps.value.Balance.toFixed(2) }}</span>
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <!--img
              :alt="slotProps.option.Name"
              :src="`${slotProps.option.Type.toLowerCase()}.png`"
              :class="`mr-2`"
              style="width: 18px"
            /-->
                <div class="flex flex-col">
                  <span>{{ slotProps.option.Name }}</span>
                  <span
                    >Balance: {{ slotProps.option.Balance.toFixed(2) }}</span
                  >
                </div>
              </div>
            </template>
          </Select>
          <InputNumber fluid v-model="addValue" placeHolder="Add value" />
        </div>
      </div>
      <!-- Actions -->
      <div class="flex justify-end gap-2 mt-4">
        <!--Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="openAddMoney = false"
        ></Button-->
        <Button
          type="button"
          label="Add money securely"
          @click="saveAddMoney"
          fluid
          rounded
        ></Button>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCardStore } from "../store/cards";
import { useAccountStore } from "../store/accounts";
import { useTransactionStore, Transaction } from "../store/transactions";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import getSymbolFromCurrency from "currency-symbol-map";
const modules = ref([Pagination]);
const cardStore = useCardStore();
const accountStore = useAccountStore();
const transactionStore = useTransactionStore();
const openAddMoney = ref(false);
const addValue = ref(10.05);
const selectedAccount = ref(
  accountStore.defaultAccounts[accountStore.activeAccountIndex]
);
const selectedCard = ref(cardStore.cards[0]);
const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = (e: any) => {
  //console.log("slide change", e.activeIndex);
  accountStore.activeAccountIndex = e.activeIndex;
  //console.log(accountStore.defaultAccounts[e.activeIndex])
};

function saveAddMoney() {
  console.log("Accpount Details:", selectedAccount);
  console.log(addValue.value);
  openAddMoney.value = false;
  //selectedAccount.value.Balance += addValue.value;
  accountStore.updateAccount(
    selectedAccount.value.ID,
    addValue.value,
    selectedCard.value
  );
  //cardDetails.value.ID = cardStore.cards.length;
  //cardStore.cards.push(cardDetails.value);
}

function formatTransactiontext(ts: Transaction) {
  switch (ts.Type) {
    case "Debit":
      return `${ts.MerchantOrSource}`;
    case "Credit":
      return `You have received ${ts.Amount} ${ts.Currency} from ${ts.MerchantOrSource}`;
    case "Add":
      return `Money Added via ****${ts.CardNumber.slice(-4)}`;
  }
}

function formatCurrency(ts: Transaction) {
  switch (ts.Type) {
    case "Debit":
      return `-${ts.Amount}${getSymbolFromCurrency(ts.Currency)}`;
    default:
      return `+${ts.Amount}${getSymbolFromCurrency(ts.Currency)}`;
  }
}
// Format date for better readability
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000); // Start of yesterday

  const dateTimeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (date >= today) {
    return `Today, ${dateTimeString}`;
  } else if (date >= yesterday) {
    return `Yesterday, ${dateTimeString}`;
  } else {
    return `${date.toLocaleDateString([], {
      day: "numeric",
    })}. ${date.toLocaleDateString([], {
      month: "short",
    })}, ${dateTimeString}`;
  }
}

const selectDT = ref({
  dropdown: {
    width: "100px",
  },
});

const dataViewDT = ref({
  content: {
    border: {
      radius: "20px",
    },
  },
});
</script>

<style>
.swiper-pagination-bullet {
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.7;
  transition: all 0.3s ease;
  margin: 2px !important;
}

.swiper-pagination-bullet-active {
  background-color: white !important;
  width: 7px;
  height: 7px;
  opacity: 1;
}
.swiper-pagination-bullet-active-next {
  width: 3px;
  height: 3px;
}
.swiper-pagination {
  bottom: 20px;
}
</style>
