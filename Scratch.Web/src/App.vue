<template>
    <div
        id="layout"
        :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]"
    >
        <!-- Page Container -->
        <div class="bg-primary-100 h-screen flex flex-col">
            <header class="bg-gray-50 flex flex-shrink-0 items-center justify-between h-16 px-6">
                <nav class="w-full">
                    <div class="relative">
                        <base-icon-solid class="absolute mt-2 ml-2 left-0 text-gray-400" name="search"></base-icon-solid>
                        <input type="search" placeholder="Search..." class="border rounded py-1 pl-8 pr-2 w-full focus:outline-none" />
                    </div>
                </nav>

                <div class="ml-6 flex text-gray-400 items-center space-x-3">
                    <button>
                        <base-icon-solid name="question-mark-circle" />
                    </button>
                    <button>
                        <base-icon-solid name="cog" />
                    </button>
                    <button>
                        <base-icon-solid name="bell" />
                    </button>
                </div>
            </header>

            <main class="flex-1">
                <section class="p-8">
                    <span class="custom-class">Render Body</span>
                    <b-avatar></b-avatar>
                    <b-avatar icon="people-fill"></b-avatar>
                    <b-button variant="outline-primary">Button</b-button>


                    <!-- <figure>
                      <InlineSVG />
                    </figure> -->

                    <!-- <img :src="externalSVG" /> -->
                    <!-- <div class="external-svg" /> -->
                </section>
            </main>
        </div>

        <!-- Sidebar Menu -->
        <sidebar-menu
            :menu="menu"
            :collapsed="collapsed"
            :show-one-child="true"
            width="264px"
            @toggle-collapse="onToggleCollapse"
        >
            <div slot="header">
                <a
                    href="#"
                    class="py-2 flex items-center text-primary-500 bg-white"
                >
                    <base-logo name="hancock-h"></base-logo>

                    <span v-if="!collapsed" class="font-bold">
                        Exemplar Core
                    </span>
                </a>

                <div class="mt-3 p-2">
                    <a href="#" class="flex text-white hover:text-white items-center">
                        <base-avatar class="rounded-full w-8 h-8"></base-avatar>

                        <div v-if="!collapsed" class="ml-2 text-xs">
                            <span class="font-bold uppercase">Michael Houser</span><br />
                            <span>mhouser@hancockclaims.com</span>
                        </div>
                    </a>
                </div>
            </div>

            <span slot="toggle-icon" class="flex items-center px-2 space-x-2">
                <span>
                    <base-icon-outlined
                        class="w-5 h-5 text-gray-300"
                        :name="`${ collapsed ? 'chevron-right' : 'chevron-left' }`"
                    ></base-icon-outlined>
                </span>

                <span v-if="!collapsed" class="whitespace-nowrap">
                    Toggle Toolbar
                </span>
            </span>
        </sidebar-menu>

        <div
            v-if="isOnMobile && !collapsed"
            class="sidebar-overlay"
            @click="collapsed = true"
        />
    </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import BaseIconOutlined from './components/BaseIconOutlined.vue';
import InlineSVG from '@/assets/svg/vue.svg?inline';
import ExternalSVG from '@/assets/svg/webpack.svg';

export default {
    name: 'App',

    components: { BaseIconOutlined, InlineSVG },

    data() {
        return {
            menu: [
                {
                    header: true,
                    title: 'Main Navigation',
                    hiddenOnCollapse: true,
                },
                {
                    href: '#',
                    title: 'Dashboard',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'template',
                        },
                        text: 'Custom Icon Text',
                    },
                },
                {
                    href: '#',
                    title: 'Projects',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'collection',
                        },
                    },
                },
                {
                    href: '#',
                    title: 'Calendar',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'calendar',
                        },
                    },
                },
                {
                    href: '#',
                    title: 'Customers',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'office-building',
                        },
                    },
                },
                {
                    href: '#',
                    title: 'Billing',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'credit-card',
                        },
                    },
                },
                {
                    href: '#',
                    title: 'Users',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'users',
                        },
                    },
                },
                {
                    href: '#',
                    title: 'Reports',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'document-report',
                        },
                    },
                },
                {
                    href: '#',
                    title: 'Documentation',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'document-text',
                        },
                    },
                },
                {
                    title: 'Settings',
                    icon: {
                        element: 'base-icon-outlined',
                        class: 'text-gray-300',
                        attributes: {
                            name: 'cog',
                        },
                    },
                    child: [
                        {
                            title: 'Territories List',
                            href: '#',
                        },
                        {
                            title: 'Service Areas',
                            child: [
                                {
                                    title: 'Add Service Area',
                                },
                                {
                                    title: 'Assign Service Tech',
                                },
                            ],
                        },
                        {
                            title: 'Preferences',
                        },
                        {
                            title: 'Service Types',
                            child: [
                                {
                                    title: 'Just an example',
                                    child: [
                                        {
                                            title: 'A Page',
                                        },
                                        {
                                            title: 'Another Page',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            collapsed: false,
            isOnMobile: false,
        };
    },

    computed: {
        externalSVG() {
            return ExternalSVG;
        },
    },
    mounted () {
        console.log(videojs);
        this.onResize();
        window.addEventListener('resize', this.onResize);
    },

    methods: {
        onOpen() {
            console.log('onOpen');
        },

        onToggleCollapse(collapsed) {
            this.collapsed = collapsed;
        },

        onResize() {
            if (window.innerWidth <= 767) {
                this.isOnMobile = true;
                this.collapsed = true;
            } else {
                this.isOnMobile = false;
                this.collapsed = false;
            }
        },
    }
}
</script>

<style lang="scss">
$blue:    #314B6F;
$orange:    #ee7d1e;

$primary: $blue;
$secondary: $orange;

@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

// .custom-class {
//     color: var(--secondary);
// }

#layout {
    padding-left: 264px;
    transition: 0.3s ease;
}

#layout.collapsed {
    padding-left: 50px;
}

#layout.onmobile {
    padding-left: 50px;
}

.sidebar-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 900;
}

.layout {
    padding: 50px;
}

/* .page-wrapper {
  max-width: 900px;
  @apply max-w-lg border;
} */
</style>
