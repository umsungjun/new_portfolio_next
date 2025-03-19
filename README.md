## 커밋 컨벤션

```
Feat : 새로운 기능을 추가하는 경우
Fix : 버그를 고친경우
Docs : 문서를 수정한 경우
Style : 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는경우
Refactor : 코드 리펙토링
Test : 테스트 코드, 리펙토링 테스트 코드를 추가했을 때
Chore : 빌드 업무 수정, 패키지 매니저 수정
Design : CSS 등 사용자가 UI 디자인을 변경했을 때
Rename : 파일명(or 폴더명) 을 수정 했을 때
Remove : 코드(파일) 삭제가 있을 때
```

## 트러블 슈팅 기록

### 1. Hydration failed

```
- 기존 `.env` 파일에 있었던 상수 `PUBLIC_PHONE_NUMBER`를 `NEXT_PUBLIC_PHONE_NUMBER`로 변경하여 해결
- `NEXT_PUBLIC_PHONE_NUMBER`는 클라이언트에서 접근 가능, `PHONE_NUMBER`는 서버 컴포넌트에서 접근 가능

관련 공식 문서: [Next.js Hydration Error] (https://nextjs.org/docs/messages/react-hydration-error)
```

### 2. next-intl getTranslations 작동 안함 문제

```
export default async function Side({ params }: SideProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
}
- getTranslations는 서버 컴포넌트에서 호출되며, locale 정보를 명시적으로 전달해야 합니다.
- params 객체에서 locale 값을 추출하지 않거나, 잘못된 값을 전달하면 번역 메시지를 로드할 수 없습니다.
```
