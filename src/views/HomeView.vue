<template>
  <div
    class="top-[4rem] bottom-[4rem] absolute w-full bg-inherit p-4 flex flex-col"
  >
    <div class="card !bg-inherit shadow-2xl !p-0">
      <!--Galleria
        :value="accountStore.defaultAccounts"
        :numVisible="5"
        containerStyle="max-width: 640px"
        :showThumbnails="false"
        :showIndicators="true"
      >
        <template #item="slotProps">
          <div class="flex flex-col items-center justify-center p-4">
            <div class="h-20 mb-3">
              <div class="flex gap-1 item-center justify-center">
                <div class="flex items-center"></div>
                <div class="flex items-center justify-center">
                  <p
                    class="text-surface-700 dark:text-white text-4xl text-center flex items-center justify-center"
                  >
                    {{ slotProps.item.Type }}
                  </p>
                </div>
                <div class="flex items-center justify-center">
                  <font-awesome-icon
                    :icon="['fas', 'circle']"
                    class="text-surface-700 dark:text-white"
                  />
                </div>
                <p
                  class="text-surface-700 dark:text-white text-3xl text-center flex items-center"
                >
                  {{ slotProps.item.Name }}
                </p>
              </div>
              <span
                class="text-surface-700 text-5xl dark:text-white w-full text-center flex justify-center"
                >{{ Math.floor(slotProps.item.Balance) }},<span
                  class="align-baseline inline-block flex items-end text-2xl"
                  >{{
                    slotProps.item.Balance.toString().split(".")[1] || ""
                  }}</span
                ></span
              >
            </div>
            <Button label="Accounts" />
          </div>
        </template>
      </Galleria-->
      <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="(item, index) in accountStore.defaultAccounts"
          :key="index"
        >
          <div class="flex flex-col items-center justify-center p-4">
            <div class="h-20 mb-3">
              <div class="flex gap-1 item-center justify-center">
                <div class="flex items-center"></div>
                <div class="flex items-center justify-center">
                  <p
                    class="text-surface-700 dark:text-white text-4xl text-center flex items-center justify-center"
                  >
                    {{ item.Type }}
                  </p>
                </div>
                <div class="flex items-center justify-center">
                  <font-awesome-icon
                    :icon="['fas', 'circle']"
                    class="text-surface-700 dark:text-white"
                  />
                </div>
                <p
                  class="text-surface-700 dark:text-white text-3xl text-center flex items-center"
                >
                  {{ item.Name }}
                </p>
              </div>
              <span
                class="text-surface-700 text-5xl dark:text-white w-full text-center flex justify-center"
                >{{ Math.floor(item.Balance) }},<span
                  class="align-baseline inline-block flex items-end text-2xl"
                  >{{ item.Balance.toFixed(2).toString().split(".")[1] || "" }}</span
                ></span
              >
            </div>
            <Button label="Accounts" />
          </div>
        </swiper-slide>
      </swiper>
      <div class="flex justify-evenly">
        <div
          class="flex flex-col p-2 items-center"
          @click="openAddMoney = true"
        >
          <div
            class="rounded-full w-[50px] h-[50px] p-0 bg-slate-300 dark:bg-neutral-800 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-surface-700 dark:text-white"
            />
          </div>
          <span class="text-surface-700 text-nowrap font-bold dark:text-white"
            >Add money</span
          >
        </div>
        <div class="flex flex-col p-2 items-center">
          <div
            class="rounded-full w-[50px] h-[50px] p-0 bg-slate-300 dark:bg-neutral-800 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'shuffle']"
              class="text-surface-700 dark:text-white"
            />
          </div>
          <span class="text-surface-700 font-bold dark:text-white">Move</span>
        </div>
        <div class="flex flex-col p-2 items-center">
          <div
            class="rounded-full w-[50px] h-[50px] p-0 bg-slate-300 dark:bg-neutral-800 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'building-columns']"
              class="text-surface-700 dark:text-white"
            />
          </div>
          <span class="text-surface-700 font-bold dark:text-white"
            >Details</span
          >
        </div>
        <div class="flex flex-col p-2 items-center">
          <div
            class="rounded-full w-[50px] h-[50px] p-0 bg-slate-300 flex dark:bg-neutral-800 items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'ellipsis']"
              class="text-surface-700 dark:text-white"
            />
          </div>
          <span class="text-surface-700 font-bold dark:text-white">More</span>
        </div>
      </div>
    </div>

    <!--Transactions-->
    <div class="grow overflow-scroll">
      <DataView :value="transactionStore.transactions" dataKey="ID" class="">
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
                    <div>
                      <div class="text-lg font-medium mt-2">
                        {{ formatTransactiontext(item) }}
                      </div>
                      <span
                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >{{ formatRelativeTime(item.Date) }}</span
                      >
                    </div>
                    <div
                      class="bg-surface-100 p-1 h-full flex item-center justify-center"
                      style="border-radius: 30px"
                    >
                      <div
                        class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                        style="
                          border-radius: 30px;
                          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                        "
                      >
                        <span class="text-surface-900 font-bold text-lg">{{
                          formatCurrency(item)
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
                  <span>Balance: {{ slotProps.option.Balance.toFixed(2) }}</span>
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
        <Button type="button" label="Add money securely" @click="saveAddMoney" fluid rounded></Button>
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
  console.log(addValue.value)
  openAddMoney.value = false;
  //selectedAccount.value.Balance += addValue.value;
  accountStore.updateAccount(selectedAccount.value.ID, addValue.value, selectedCard.value)
  //cardDetails.value.ID = cardStore.cards.length;
  //cardStore.cards.push(cardDetails.value);
}

function formatTransactiontext(ts: Transaction) {
  switch (ts.Type) {
    case "Debit":
      return `You have sent ${ts.Amount} ${ts.Currency} to ${ts.MerchantOrSource}`;
    case "Credit":
      return `You have received ${ts.Amount} ${ts.Currency} from ${ts.MerchantOrSource}`;
    case "Add":
      return `Money Added via ****${ts.CardNumber.slice(-4)}`;
  }
}

function formatCurrency(ts: Transaction) {
  switch (ts.Type) {
    case "Debit":
      return `-${ts.Amount}`;
    default:
      return `+${ts.Amount}`;
  }
}
// Format date for better readability
function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime(); // Difference in milliseconds

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  //const weeks = Math.floor(days / 7);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days === 1) {
    return `Yesterday, ${new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (days < 7) {
    return `${new Date(date).toLocaleDateString([], {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return `${new Date(date).toLocaleDateString([], {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
}

const selectDT = ref({
  dropdown: {
    width: "100px",
  },
});
</script>
