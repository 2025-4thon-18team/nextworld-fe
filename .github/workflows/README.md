# GitHub Actions Workflows

## 배포 설정 가이드

### 1. GitHub Pages 설정

1. GitHub 리포지토리로 이동
2. Settings > Pages로 이동
3. Source를 "GitHub Actions"로 선택

### 2. GitHub Secrets 설정

환경변수 파일을 base64로 인코딩하여 GitHub Secret에 추가하세요.

**설정 방법:**

1. **로컬에서 .env 파일 생성** (예시):

```bash
# .env 파일 내용
VITE_SERVER_URL=http://localhost:8080
VITE_APP_ENV=development
VITE_ENABLE_MOCK=true
VITE_ENABLE_LOCATOR=true
VITE_ENABLE_QUERY_DEVTOOLS=true
```

2. **base64로 인코딩**:

```bash
# macOS/Linux
base64 -i .env | pbcopy  # macOS
base64 .env | xclip -selection clipboard  # Linux

# 또는 직접 출력
base64 .env
```

3. **GitHub Secrets에 추가**:
   - GitHub 리포지토리 → Settings → Secrets and variables → Actions
   - "New repository secret" 클릭
   - Name: `ENV_FILE_BASE64`
   - Value: base64로 인코딩된 문자열 붙여넣기
   - "Add secret" 클릭

**예시 .env 파일:**

```
VITE_SERVER_URL=http://localhost:8080
VITE_APP_ENV=development
VITE_ENABLE_MOCK=true
VITE_ENABLE_LOCATOR=true
VITE_ENABLE_QUERY_DEVTOOLS=true
```

**참고:**

- base64 인코딩된 문자열은 빌드 시 자동으로 디코딩되어 `.env` 파일로 생성됩니다.
- `.env` 파일은 `.gitignore`에 포함되어 있어 리포지토리에 커밋되지 않습니다.

### 3. 배포 트리거

- `main` 또는 `dev` 브랜치에 push 시 자동 배포
- GitHub Actions 탭에서 수동 실행 가능 (workflow_dispatch)

### 4. 배포 확인

배포가 완료되면 다음 URL에서 확인할 수 있습니다:

- `https://[username].github.io/nextworld-fe/`
