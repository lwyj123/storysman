import {
    Component,
    ComponentOptions,
    FunctionalComponentOptions,
    RecordPropsDefinition,
  } from "./Component";
  import VNode, { VNodeData, VNodeChildren, ScopedSlot } from "./vnode";
  
  export interface CreateElement {
    (tag?: string | Component<any, any, any, any>, children?: VNodeChildren): VNode;
    (tag?: string | Component<any, any, any, any> | (() => Component), data?: VNodeData, children?: VNodeChildren): VNode;
  }
  
  export interface Vue {
    readonly $el: HTMLElement;
    readonly $options: ComponentOptions<Vue>;
    readonly $parent: Vue;
    readonly $root: Vue;
    readonly $children: Vue[];
    readonly $refs: { [key: string]: Vue | Element | Vue[] | Element[] };
    readonly $slots: { [key: string]: VNode[] };
    readonly $scopedSlots: { [key: string]: ScopedSlot };
    readonly $isServer: boolean;
    readonly $data: Record<string, any>;
    readonly $props: Record<string, any>;
    readonly $ssrContext: any;
    readonly $vnode: VNode;
    readonly $attrs: Record<string, string>;
    readonly $listeners: Record<string, Function | Function[]>;
  
    $mount(elementOrSelector?: Element | string, hydrating?: boolean): this;
    $forceUpdate(): void;
    $destroy(): void;
    $set: typeof Vue.set;
    $delete: typeof Vue.delete;
    $on(event: string | string[], callback: Function): this;
    $once(event: string, callback: Function): this;
    $off(event?: string | string[], callback?: Function): this;
    $emit(event: string, ...args: any[]): this;
    $nextTick(callback: (this: this) => void): void;
    $nextTick(): Promise<void>;
    $createElement: CreateElement;
  }
  
  export type CombinedVueInstance<Instance extends Vue, Data, Methods, Computed, Props> =  Data & Methods & Computed & Props & Instance;
  export type ExtendedVue<Instance extends Vue, Data, Methods, Computed, Props> = VueConstructor<CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue>;
  
  export interface VueConfiguration {
    silent: boolean;
    optionMergeStrategies: any;
    devtools: boolean;
    productionTip: boolean;
    performance: boolean;
    errorHandler(err: Error, vm: Vue, info: string): void;
    warnHandler(msg: string, vm: Vue, trace: string): void;
    ignoredElements: (string | RegExp)[];
    keyCodes: { [key: string]: number | number[] };
  }
  
  export interface VueConstructor<V extends Vue = Vue> {
    new (options?: ComponentOptions<V>): CombinedVueInstance<V, object, object, object, Record<keyof object, any>>;
  
    extend<PropNames extends string = never>(definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>): ExtendedVue<V, {}, {}, {}, Record<PropNames, any>>;
    extend<Props>(definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>): ExtendedVue<V, {}, {}, {}, Props>;
    extend(options?: ComponentOptions<V>): ExtendedVue<V, {}, {}, {}, {}>;
  
    nextTick(callback: () => void, context?: any[]): void;
    nextTick(): Promise<void>
    set<T>(object: object, key: string, value: T): T;
    set<T>(array: T[], key: number, value: T): T;
    delete(object: object, key: string): void;
    delete<T>(array: T[], key: number): void;

    filter(id: string, definition?: Function): Function;
  
    component(id: string): VueConstructor;
    component<VC extends VueConstructor>(id: string, constructor: VC): VC;
    component<PropNames extends string>(id: string, definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]>): ExtendedVue<V, {}, {}, {}, Record<PropNames, any>>;
    component<Props>(id: string, definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>>): ExtendedVue<V, {}, {}, {}, Props>;
    component(id: string, definition?: ComponentOptions<V>): ExtendedVue<V, {}, {}, {}, {}>;
  
    mixin(mixin: VueConstructor | ComponentOptions<Vue>): void;
    compile(template: string): {
      render(createElement: typeof Vue.prototype.$createElement): VNode;
      staticRenderFns: (() => VNode)[];
    };
  
    config: VueConfiguration;
  }
  
  export const Vue: VueConstructor;
  