import { Vue, CreateElement, CombinedVueInstance } from "./vue";
import VNode, { VNodeData, VNodeDirective } from "./vnode";

type DefaultData<V> =  object | ((this: V) => object);
type DefaultProps = Record<string, any>;
type DefaultMethods<V> =  { [key: string]: (this: V, ...args: any[]) => any };
type DefaultComputed = { [key: string]: any };

export declare type Component<Data=DefaultData<never>, Methods=DefaultMethods<never>, Computed=DefaultComputed, Props=DefaultProps> =
| typeof Vue
| FunctionalComponentOptions<Props>
| ComponentOptions<never, Data, Methods, Computed, Props> 

export type Accessors<T> = {
  [K in keyof T]: (() => T[K]) | ComputedOptions<T[K]>
}

export declare interface ComponentOptions<
  V extends Vue,
  Data=DefaultData<V>,
  Methods=DefaultMethods<V>,
  Computed=DefaultComputed,
  PropsDef=PropsDefinition<DefaultProps>,
  Props=DefaultProps> {
  data?: Data;
  props?: PropsDef;
  propsData?: object;
  computed?: Accessors<Computed>;
  methods?: Methods;
//   watch?: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any> | string>;

  el?: Element | string;
  template?: string;
  // hack is for funcitonal component type inference, should not used in user code
  render?(createElement: CreateElement, hack: RenderContext<Props>): VNode;
  renderError?: (h: () => VNode, err: Error) => VNode;
  staticRenderFns?: ((createElement: CreateElement) => VNode)[];

  beforeCreate?(this: V): void;
  created?(): void;
  beforeDestroy?(): void;
  destroyed?(): void;
  beforeMount?(): void;
  mounted?(): void;
  beforeUpdate?(): void;
  updated?(): void;
  activated?(): void;
  deactivated?(): void;
//   errorCaptured?(err: Error, vm: Vue, info: string): boolean | void;

  components?: { [key: string]: Component<any, any, any, any>};
  transitions?: { [key: string]: object };
  filters?: { [key: string]: Function };

  provide?: object | (() => object);

  model?: {
    prop?: string;
    event?: string;
  };

  parent?: Vue;
  name?: string;
  delimiters?: [string, string];
  comments?: boolean;
  inheritAttrs?: boolean;
}

export interface FunctionalComponentOptions<Props = DefaultProps, PropDefs = PropsDefinition<Props>> {
  name?: string;
  props?: PropDefs;
  functional: boolean;
  render?(this: undefined, createElement: CreateElement, context: RenderContext<Props>): VNode;
}

export interface RenderContext<Props=DefaultProps> {
  props: Props;
  children: VNode[];
  slots(): any;
  data: VNodeData;
  parent: Vue;
  listeners: { [key: string]: Function | Function[] };
  injections: any
}

export type Prop<T> = { (): T } | { new (...args: any[]): T & object }

export type PropValidator<T> = PropOptions<T> | Prop<T> | Prop<T>[];

export interface PropOptions<T=any> {
  type?: Prop<T> | Prop<T>[];
  required?: boolean;
  default?: T | null | undefined | (() => object);
  validator?(value: T): boolean;
}

export type RecordPropsDefinition<T> = {
  [K in keyof T]: PropValidator<T[K]>
}
export type ArrayPropsDefinition<T> = (keyof T)[];
export type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>;

export interface ComputedOptions<T> {
  get?(): T;
  set?(value: T): void;
  cache?: boolean;
}