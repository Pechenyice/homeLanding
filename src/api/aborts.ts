export const aborts = {
  ENTITIES_GET_LIST_CONTROLLER: new AbortController(),
  QUERIES_CATEGORIES_CONTROLLER: new AbortController(),
};

export enum ABORT_CONTROLLER {
  ENTITIES_GET_LIST_CONTROLLER = 'ENTITIES_GET_LIST_CONTROLLER',
  QUERIES_CATEGORIES_CONTROLLER = 'QUERIES_CATEGORIES_CONTROLLER',
}

export function abortRequest(controller: ABORT_CONTROLLER) {
  aborts[controller].abort();
  aborts[controller] = new AbortController();
}
