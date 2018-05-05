import VNode from '../vnode'

declare type InternalComponentOptions = {
  _isComponent: true;
  parent: Component;
  _parentVnode: VNode;
  render?: Function;
  staticRenderFns?: Array<Function>
};

type InjectKey = string | symbol;

declare type ComponentOptions = {
  componentId?: string;

  // data
  data: Object | Function | void;
  props?: { [key: string]: PropOptions };
  propsData?: Object | void;
  computed?: {
    [key: string]: Function | {
      get?: Function;
      set?: Function;
      cache?: boolean
    }
  };
  methods?: { [key: string]: Function };
  watch?: { [key: string]: Function | string };

  // DOM
  el?: string | Element;
  template?: string;
  render: (h: () => VNode) => VNode;
  renderError?: (h: () => VNode, err: Error) => VNode;
  staticRenderFns?: Array<() => VNode>;

  // lifecycle
  beforeCreate?: Function;
  created?: Function;
  beforeMount?: Function;
  mounted?: Function;
  beforeUpdate?: Function;
  updated?: Function;
  activated?: Function;
  deactivated?: Function;
  beforeDestroy?: Function;
  destroyed?: Function;
  errorCaptured?: () => boolean | void;

  // assets
  directives?: { [key: string]: Object };
  components?: { [key: string]: Component };
  transitions?: { [key: string]: Object };
  filters?: { [key: string]: Function };

  // context
  // provide?: { [key: string | symbol]: any } | () => { [key: string | symbol]: any };
  // inject?: { [key: string]: InjectKey | { from?: InjectKey, default?: any }} | Array<string>;

  // component v-model customization
  model?: {
    prop?: string;
    event?: string;
  };

  // misc
  parent?: Component;
  mixins?: Array<Object>;
  name?: string;
  extends?: Component | Object;
  delimiters?: [string, string];
  comments?: boolean;
  inheritAttrs?: boolean;

  // private
  _isComponent?: true;
  _propKeys?: Array<string>;
  _parentVnode?: VNode;
  _parentListeners?: Object | void;
  _renderChildren?: Array<VNode> | void;
  _componentTag: string | void;
  _scopeId: string | void;
  _base: Component;
};

declare type PropOptions = {
  type: Function | Array<Function> | null;
  default: any;
  required: boolean | void;
  validator: Function | void;
}
