export function isRequestOk(elem) {
  return elem.readyState === 4 && elem.status === 200;
}

export function parseData(elem) {
  return JSON.parse(elem.responseText)
}

export function isNull(elem) {
  if (elem.category === null) {
    elem.category = 'explict';
  }
  return elem.category;
}