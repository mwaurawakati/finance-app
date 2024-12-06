<template>
  <div
    ref="el"
    id="cont"
    class="top-[60px] bottom-0 absolute w-full bg-inherit p-4 flex flex-col overflow-scroll h-auto mb-[0px]"
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
                  <Avatar
                    :image="`${item.Name.toLocaleLowerCase()}.png`"
                    shape="circle"
                    class="!w-6 !h-6"
                  />
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
                class="flex flex-col sm:flex-row sm:items-center p-2 gap-4"
                :class="{
                  'border-none': index !== 0,
                }"
              >
                <div
                  class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                >
                  <div class="flex flex-row items-center gap-0 p-0">
                    <div class="!w-[25%] !h-[70px] rounded-full">
                      <div class="w-[50px] bg-white rounded-full">
                        <img
                          :src="item.Image"
                          size="large"
                          shape="circle"
                          class="!w-[50px] !h-[50px] rounded-full"
                        />
                        <div
                          v-show="item.Type == 'Add'"
                          class="float-right mt-[-20px] mr-[-10px] rounded-full bg-[#697afe] z-10 relative border border-black border-4 w-[30px] flex items-center justify-center h-[30px]"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'plus']"
                            class="text-surface-700 dark:text-grey-500"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="w-[55%]">
                      <div class="text-sm font-medium mt-2 grow text-balance">
                        <p>
                          {{ formatTransactiontext(item) }}
                        </p>
                      </div>
                      <span
                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >{{ formatRelativeTime(item.Date) }}</span
                      >
                    </div>
                    <div
                      class="p-1 h-full flex item-center justify-center flex-col"
                      style="border-radius: 30px; width: 20%"
                    >
                      <span class="dark:text-white text-lg h-1/2">
                        {{ formatCurrency(item) }}
                      </span>
                      <span class="h-1/2">{{
                        item.Fee > 0 ? `${item.Fee}Ft` : ""
                      }}</span>
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
    position="full"
    style="height: 90%"
    :dt="{}"
    class="dark:!bg-black !border-none"
  >
    <template #container>
      <div class="p-4 pb-0">
        <Button
          class="!float-left !bg-inherit !border-none dark:!text-white !border-transparent"
          size="large"
          @click="openAddMoney = false"
        >
          <template #icon>
            <i class="pi pi-arrow-left" style="font-size: 1.2rem" />
          </template>
        </Button>
        <BiShieldQuarter
          color="#697bfe"
          size="30"
          style="transform: scaleX(-1); float: right"
        />
      </div>

      <div class="flex flex-col h-full px-4">
        <h3
          class="w-full text-left font-black text-3xl"
          style="font-family: system-ui"
        >
          Add money
        </h3>
        <div class="grow flex flex-col gap-3">
          <div
            class="w-full md:w-56 !rounded-xl !border-none !p-4 dark:!bg-neutral-900 flex"
          >
            <div v-if="selectedCard" class="flex items-center grow">
              <img
                :alt="selectedCard.Name"
                :src="`${selectedCard.Type.toLowerCase()}.png`"
                :class="`mr-6 rounded-full bg-white`"
                style="width: 40px"
              />
              <div class="flex flex-col">
                <span class="font-extrabold uppercase">{{
                  selectedCard.BankName
                }}</span>
                <div class="flex items-center justify-cente dark:text-gray-400">
                  <span class="uppercase mr-1">{{ selectedCard.Type }}</span>
                  <div class="flex items-center justify-center h-full">
                    <span>&#183;</span>
                    <span>&#183;</span>
                  </div>
                  <span>{{ selectedCard.CardNumber.slice(-4) }}</span>
                </div>
              </div>
            </div>
            <p
              @click="openChangeCard = true"
              style="font-family: system-ui"
              class="!bg-[#1c1c34] !border-none !float-right rounded text-[#697bfe] font-bold p-0 px-4 rounded-3xl flex items-center"
            >
              Change
            </p>
          </div>
          <div
            class="w-full my-[-10px] flex justify-center z-10"
            style="margin-top: -25px; margin-bottom: -25px"
          >
            <Button rounded class="dark:!bg-black !border-none">
              <template #icon>
                <i class="pi pi-arrow-down text-white" />
              </template>
            </Button>
          </div>
          <div
            class="flex gap-2 p-4 !rounded-xl !border-none !p-4 dark:!bg-neutral-800"
          >
            <div class="flex flex-col w-1/2">
              <Select
                v-model="selectedAccount"
                :options="accountStore.defaultAccounts"
                filter
                optionLabel="name"
                placeholder="Select a Country"
                class="w-full md:w-56 !bg-transparent !border-none flex gap-2 p-[10px]"
                fluid
                unstyled
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <img
                      :alt="slotProps.value"
                      :src="`${slotProps.value.Name.toLowerCase()}.png`"
                      :class="`mr-2 rounded-full`"
                      style="width: 18px"
                    />
                    <div class="flex flex-col font-black">
                      <span>{{ slotProps.value.Name }}</span>
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
                      :src="`${slotProps.option.Name.toLowerCase()}.png`"
                      :class="`mr-2`"
                      style="width: 18px"
                    />
                    <div class="flex flex-col">
                      <span>{{ slotProps.option.Name }}</span>
                    </div>
                  </div>
                </template>
              </Select>
              <div class="ml-2 mt-4 opacity-60">
                <span
                  >Balance: {{ selectedAccount.Balance.toFixed(2) }}
                  {{ getSymbolFromCurrency(selectedAccount.Name) }}</span
                >
              </div>
            </div>
            <div v-focustrap class="w-1/2 flex flex-col">
              <InputNumber
                unstyled
                autofocus
                :focused="openAddMoney"
                class="!border-none !bg-transparent font-black text-xl w-auto in !shadow-none"
                v-model="addValue"
                placeHolder="Add value"
                :suffix="getSymbolFromCurrency(selectedAccount.Name)"
                style="
                  font-family: system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                    'Helvetica Neue', sans-serif;
                "
              />
              <span class="text-end opacity-65 mt-3 mr-8">No fee</span>
            </div>
          </div>
        </div>
        <!-- Actions -->
        <div class="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            class="!border-none !bg-[#697bfe] !p-4 !text-white !font-extrabold"
            label="Add money securely"
            @click="saveAddMoney"
            fluid
            rounded
          ></Button>
        </div>
      </div>
    </template>
  </Drawer>

  <!--processing drawer-->
  <Drawer
    v-model:visible="processing"
    header="Bottom Drawer"
    position="bottom"
    style="height: auto; margin: 30px; border-radius: 50px"
    class="!rounded-5xl"
  >
    <template #container>
      <div
        class="p-8 flex flex-col items-center justify-center bg-neutral-700 rounded-3xl"
      >
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        <MdAccessTime color="grey" size="40" />
        <p class="font-black text-xl text-center mt-4">
          Your transaction is being processed
        </p>
      </div>
    </template>
  </Drawer>

  <!--changer card drawer drawer-->
  <Drawer
    v-model:visible="openChangeCard"
    header="Bottom Drawer"
    position="bottom"
    style="height: 97%"
    class="!rounded-5xl"
  >
    <template #container>
      <div class="p-4 pb-0">
        <Button
          class="!float-left !bg-inherit !border-none dark:!text-white !border-transparent"
          size="large"
          @click="openChangeCard = false"
        >
          <template #icon>
            <i class="pi pi-times" style="font-size: 1.2rem" />
          </template>
        </Button>
      </div>

      <div class="flex flex-col h-full px-4">
        <h3
          class="w-full text-left font-black text-3xl"
          style="font-family: system-ui"
        >
          How to add money
        </h3>
        <div class="grow flex flex-col gap-3">
          <div class="flex justify-between">
            <span class="font-bold">Cards</span>
            <span @click="openAddCard = true" class="text-sky-600">Add card securely</span>
          </div>
          <div
            class="w-full md:w-56 !rounded-xl !border-none !p-4 dark:!bg-neutral-800 flex"
          >
            <div v-if="selectedCard" class="flex items-center grow">
              <img
                :alt="selectedCard.Name"
                :src="`${selectedCard.Type.toLowerCase()}.png`"
                :class="`mr-6 rounded-full bg-white`"
                style="width: 40px"
              />
              <div class="flex flex-col">
                <span class="font-extrabold uppercase">{{
                  selectedCard.BankName
                }}</span>
                <div class="flex items-center justify-cente dark:text-gray-400">
                  <span class="uppercase mr-1">{{ selectedCard.Type }}</span>
                  <div class="flex items-center justify-center h-full">
                    <span>&#183;</span>
                    <span>&#183;</span>
                  </div>
                  <span>{{ selectedCard.CardNumber.slice(-4) }}</span>
                </div>
              </div>
            </div>
            <p
              style="font-family: system-ui"
              class="!bg-inherit !border-none !float-right rounded text-[#697bfe] font-bold p-0 px-4 rounded-3xl flex items-center"
            >
              <i class="pi pi-info-circle" style="font-size: 1.2rem" />
            </p>
          </div>

          <div>
            <p class="font-bold">Others</p>
            <div class="bg-neutral-800 rounded gap-4 flex flex-col p-2 rounded">
              <div class="flex justify-center items-center">
                <div class="bg-slate-700 rounded-full w-[20%] h-[30px] flex items-center justify-center">
                  <i
                    class="pi pi-arrow-right-arrow-left"
                    style="font-size: 1.2rem"
                  />
                </div>
                <div class="w-[80%] ml-2 p-2 flex flex-col">
                  <span class="font-semibold">Regular bank transfer</span>
                  <span
                    >View account details to make a transfer from your other
                    bank</span
                  >
                </div>
              </div>
              <div class="flex p-2 gap-2">
                <img src="/applepay2.png" class="w-[60px] h-[40px] rounded"/>
                <span class="flex items-center font-bold">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Drawer>

  <!--Add Card Dialog-->
  <Dialog
    v-model:visible="openAddCard"
    modal
    header="Add Card"
    :style="{ width: '90%' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">
      Please enter your card details to proceed.
    </span>
    <div class="flex flex-col gap-4">
      <!-- Cardholder Name -->
      <div class="flex items-center gap-4">
        <label for="cardholder" class="font-semibold w-24">Cardholder</label>
        <InputText
          id="cardholder"
          class="flex-auto"
          v-model="cardDetails.Name"
          placeholder="Name on Card"
          autocomplete="off"
        />
      </div>

      <!-- Bank Name -->
      <div class="flex items-center gap-4">
        <label for="bankname" class="font-semibold w-24">Bank Name</label>
        <InputText
          id="bankname"
          class="flex-auto"
          v-model="cardDetails.BankName"
          placeholder="Name of the bank"
          autocomplete="off"
        />
      </div>
      <!-- Card Number -->
      <div class="flex items-center gap-4">
        <label for="cardNumber" class="font-semibold w-24">Card Number</label>
        <InputMask
          name="cardNumber"
          mask="9999 9999 9999 9999"
          placeholder="1234 5678 1234 5978"
          v-model="cardDetails.CardNumber"
          fluid
        />
      </div>

      <!--card type-->
      <Select
        v-model="cardDetails.Type"
        :options="cardTypes"
        filter
        optionLabel="name"
        placeholder="Select a Country"
        class="w-full md:w-56"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <img
              :alt="slotProps.value"
              :src="`${slotProps.value.toLowerCase()}.png`"
              :class="`mr-2`"
              style="width: 18px"
            />
            <div>{{ slotProps.value }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <img
              :alt="slotProps.option"
              :src="`${slotProps.option.toLowerCase()}.png`"
              :class="`mr-2`"
              style="width: 18px"
            />
            <div>{{ slotProps.option }}</div>
          </div>
        </template>
      </Select>

      <!-- Expiration Date and CVV -->
      <div class="flex gap-4">
        <div class="flex items-center gap-4 flex-1">
          <label for="expiryDate" class="font-semibold w-24">Expiry</label>
          <InputMask
            name="expiryDate"
            mask="99/99"
            placeholder="XX/XX"
            fluid
            id="expiryDate"
            v-model="cardDetails.ExpiryDay"
          />
        </div>
        <div class="flex items-center gap-4 flex-1">
          <label for="cvv" class="font-semibold w-24">CVV</label>
          <InputMask
            name="cvv"
            mask="999"
            placeholder="XXX"
            fluid
            id="expiryDate"
            v-model="cardDetails.CVV"
          />
        </div>
      </div>
    </div>
    <!-- Actions -->
    <div class="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="openAddCard = false"
      ></Button>
      <Button type="button" label="Save" @click="saveCardDetails"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { MdAccessTime } from "vue-icons-plus/md";
import { ref, watch, toRefs } from "vue";
import { useCardStore, CardType } from "../store/cards";
import { useAccountStore } from "../store/accounts";
import { useTransactionStore, Transaction } from "../store/transactions";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import getSymbolFromCurrency from "currency-symbol-map";
import { useScroll } from "@vueuse/core";
import { BiShieldQuarter } from "vue-icons-plus/bi";

const processing = ref(false);
const el = ref<HTMLElement | null>(null);
const { isScrolling, arrivedState, directions } = useScroll(el);
const { bottom } = toRefs(arrivedState);
const { top: toTop, bottom: toBottom } = toRefs(directions);
watch(isScrolling, (_newScrolling, _oldScrolling) => {
  let navBar = document.getElementById("nav-bar-bottom")!;
  let cont = document.getElementById("cont")!;
  if (toBottom.value && !bottom.value) {
    navBar.style.display = "none";
    cont.style.marginBottom = "0px";
  } else if (toBottom.value && bottom.value) {
    navBar.style.display = "flex";
    cont.style.marginBottom = "70px";
  } else if (toTop.value) {
    navBar.style.display = "flex";
    cont.style.marginBottom = "0px";
  } else {
    navBar.style.display = "flex";
    cont.style.marginBottom = "0px";
  }
});


function saveCardDetails() {
  console.log("Card Details:", cardDetails.value);
  openAddCard.value = false;
  cardDetails.value.ID = cardStore.cards.length;
  cardStore.cards.push(cardDetails.value);
}

const cardDetails = ref({
  Name: "",
  CardNumber: "",
  ExpiryDay: "",
  CVV: "",
  ID: 0,
  Type: CardType.Visa,
  ShowCVV: false,
  BankName: "",
});
const cardTypes = ref(["Visa", "MasterCard", "Google", "Apple"]);
const openAddCard = ref(false);
const modules = ref([Pagination]);
const cardStore = useCardStore();
const accountStore = useAccountStore();
const transactionStore = useTransactionStore();
const openAddMoney = ref(false);
const openChangeCard = ref(false);
const addValue = ref(10);
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
  console.log("Account Details:", selectedAccount);
  console.log(addValue.value);

  // Set processing to true
  processing.value = true;
  // Simulate processing delay of 5 seconds
  setTimeout(() => {
    processing.value = false; // Reset processing after 5 seconds
    openAddMoney.value = false;
    accountStore.updateAccount(
      selectedAccount.value.ID,
      addValue.value,
      selectedCard.value
    );
  }, 5000);
  // Perform the operations
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

.in input {
  width: 80px;
  background-color: transparent;
  padding: 10px;
  float: right;
}
</style>
