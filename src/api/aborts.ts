export const aborts = {
  ENTITIES_GET_LIST_CONTROLLER: new AbortController(),
  QUERIES_CATEGORIES_CONTROLLER: new AbortController(),
  ENTITIES_GET_CONTROLLER: new AbortController(),

  LIBRARY_GET_ALL_WORDS: new AbortController(),
};

export enum ABORT_CONTROLLER {
  ENTITIES_GET_LIST_CONTROLLER = 'ENTITIES_GET_LIST_CONTROLLER',
  QUERIES_CATEGORIES_CONTROLLER = 'QUERIES_CATEGORIES_CONTROLLER',
  ENTITIES_GET_CONTROLLER = 'ENTITIES_GET_CONTROLLER',
  LIBRARY_GET_ALL_WORDS = 'LIBRARY_GET_ALL_WORDS',
}

export function abortRequest(controller: ABORT_CONTROLLER) {
  aborts[controller].abort();
  aborts[controller] = new AbortController();
}
