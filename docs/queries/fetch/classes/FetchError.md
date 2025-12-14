[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/fetch](../README.md) / FetchError

# Class: FetchError

Defined in: [src/queries/fetch.ts:54](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/fetch.ts#L54)

FetchError Class

Custom error class for API request failures.
Extends the native Error class with additional HTTP-specific properties.

## Example

```ts
try {
  await fetchData('/api/user');
} catch (error) {
  if (error instanceof FetchError) {
    console.error(`HTTP ${error.status}: ${error.message}`);
  }
}
```

## Extends

- `Error`

## Constructors

### Constructor

> **new FetchError**(`message`, `status?`, `data?`): `FetchError`

Defined in: [src/queries/fetch.ts:58](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/fetch.ts#L58)

#### Parameters

##### message

`string`

##### status?

`number`

##### data?

`unknown`

#### Returns

`FetchError`

#### Overrides

`Error.constructor`

## Properties

### data?

> `optional` **data**: `unknown`

Defined in: [src/queries/fetch.ts:56](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/fetch.ts#L56)

Additional error data from the API (if available)

***

### status?

> `optional` **status**: `number`

Defined in: [src/queries/fetch.ts:55](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/fetch.ts#L55)

HTTP status code (if available)
