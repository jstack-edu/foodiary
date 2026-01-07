# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Foodiary is a React Native mobile application built with Expo for tracking food and nutrition. The app uses React Navigation for navigation, React Native Gesture Handler and Reanimated for animations, and Host Grotesk as the primary font family.

## Development Commands

```bash
# Start development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Type checking
pnpm typecheck
```

## Architecture

### Directory Structure

- `src/app/` - Application-level code (navigation, configuration, business logic)
  - `src/app/config/` - Environment configuration (validated with Zod)
  - `src/app/contexts/` - React contexts (AuthContext, etc.)
  - `src/app/hooks/` - Custom hooks organized by type:
    - `app/` - Application-level hooks (useForceRender, etc.)
    - `mutations/` - TanStack Query mutation hooks
    - `queries/` - TanStack Query query hooks
  - `src/app/lib/` - Utilities and libraries (AuthTokensManager, queryClient)
  - `src/app/navigation/` - Navigation stacks and types
  - `src/app/services/` - API service classes
  - `src/app/types/` - Shared TypeScript types
- `src/ui/` - UI components, screens, and styling
  - `src/ui/components/` - Reusable UI components
  - `src/ui/screens/` - Screen components
  - `src/ui/styles/` - Theme and styling utilities
  - `src/ui/utils/` - UI-specific utilities

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@app/*` → `./src/app/*`
- `@ui/*` → `./src/ui/*`

Always use these aliases when importing from these directories.

### Navigation Architecture

The app uses a nested navigation structure with React Navigation v7 (native-stack):

1. **Root Navigation** (`src/app/navigation/index.tsx`): Main navigation container wrapping RootStack
2. **RootStack** (`src/app/navigation/RootStack.tsx`): Root-level stack that conditionally renders Auth or App based on authentication state
3. **AuthStack** (`src/app/navigation/AuthStack.tsx`): Authentication flow with Greetings and Onboarding screens
4. **AppStack** (`src/app/navigation/AppStack.tsx`): Main app flow (Home, MealDetails, etc.)
5. **OnboardingStack** (within Onboarding screen): Independent nested navigator for multi-step onboarding

**Navigation Pattern**: The RootStack uses the `useAuth()` hook to determine which stack to render. When `signedIn` is false, it shows AuthStack; when true, it shows AppStack. This provides a clean separation between authenticated and unauthenticated flows.

**Important**: The Onboarding screen contains its own nested stack navigator using `NavigationIndependentTree` and a separate navigation ref (`onboardingNavigation`). This allows the onboarding flow to have its own navigation state independent of the parent AuthStack.

### Onboarding Flow

The onboarding flow is managed by a Context Provider pattern:

- **Steps order** is defined in `src/ui/screens/Onboarding/steps.ts` as `orderedSteps` array
- **OnboardingProvider** (`src/ui/screens/Onboarding/context/OnboardingProvider.tsx`) manages:
  - Current step tracking via `currentStepIndex`
  - Navigation between steps via `nextStep()` and `previousStep()`
  - Integration with parent navigation (AuthStack) for back navigation

When adding/modifying onboarding steps:
1. Add the step component to `src/ui/screens/Onboarding/steps/`
2. Register it in `OnboardingStackParamList` in `OnboardingStack.tsx`
3. Add the screen to the Stack.Navigator
4. Update `orderedSteps` array in `steps.ts`

### Styling System

The project uses a custom styling system built on React Native's StyleSheet:

**Theme** (`src/ui/styles/theme/index.ts`):
- `colors`: Color palette with lime (primary), gray, black, and support colors
- `fontFamily`: Host Grotesk variants (regular, medium, semiBold)
- `fontSize`: Predefined size scale (xs, sm, base, lg, xl, 2xl, 3xl)

**Variants System** (`src/ui/styles/utils/createVariants.ts`):
A utility for creating type-safe style variants similar to CSS-in-JS libraries. Use it to create components with multiple style variations:

```typescript
const styles = createVariants({
  base: { /* base styles */ },
  variants: {
    size: { small: {...}, large: {...} },
    color: { primary: {...}, secondary: {...} }
  },
  defaultVariants: { size: 'small', color: 'primary' }
});

// Usage in component
<View style={styles({ size: 'large', color: 'secondary' })} />
```

### API Service Layer

The app uses a class-based service architecture for API communication:

**Base Service** (`src/app/services/Service.ts`):
- Abstract base class that all API services extend
- Provides a shared Axios instance configured with the API base URL
- Handles authentication via `setAccessToken()` and `removeAccessToken()`
- Implements automatic token refresh with an Axios interceptor (`setRefreshTokenHandler()`)
- Includes utility for S3 presigned POST uploads (`uploadPresignedPOST()`)

**Service Implementations**:
- `AuthService.ts` - Authentication endpoints (signIn, signUp, refresh)
- `AccountsService.ts` - Account management
- `MealsService.ts` - Meal tracking operations

**Pattern**: Services extend the base `Service` class and use the static `client` property for API calls. The AuthProvider sets up token management and refresh handlers during app initialization.

### Authentication Flow

**AuthContext** (`src/app/contexts/AuthContext/`):
- Manages authentication state through `AuthProvider`
- Initializes app by loading stored tokens from `AuthTokensManager`
- Configures the Service layer with access token and refresh token handler
- Provides methods: `signIn()`, `signUp()`, `signOut()`
- Determines `signedIn` state based on whether account data is loaded
- Controls splash screen visibility until auth state is determined

**Token Management**:
- Tokens are stored locally via `AuthTokensManager` (AsyncStorage)
- Refresh token interceptor automatically refreshes expired access tokens
- On refresh failure, user is signed out and tokens are cleared
- Token refresh avoids infinite loops by excluding `/auth/refresh-token` endpoint

### State Management

**TanStack Query (React Query)**:
- Configured via `src/app/lib/queryClient.ts`
- Hooks organized by type:
  - `src/app/hooks/queries/` - Data fetching (useAccount, etc.)
  - `src/app/hooks/mutations/` - Data mutations (useCreateMeal, etc.)
- Query client is cleared on sign out to prevent stale data

**React Context**:
- AuthContext for authentication state
- HomeProvider for home screen state
- OnboardingProvider for onboarding flow state

### Environment Configuration

Environment variables are managed through `src/app/config/env.ts`:
- Uses Zod for runtime validation of environment variables
- Variables must be prefixed with `EXPO_PUBLIC_` to be available in the app
- Currently validates: `EXPO_PUBLIC_API_URL` (must be a valid URL)

### Component Patterns

**Navigation Type Exports**: Each stack exports its own type helpers for screen props and navigation props. When creating a new screen in a stack, use the appropriate type exports:
- `RootStackScreenProps<'ScreenName'>`
- `AuthStackScreenProps<'ScreenName'>`
- `AppStackScreenProps<'ScreenName'>`
- `OnboardingStackScreenProps<'StepName'>`

**Component Organization**: Components follow this structure:
- `index.tsx` - Main component
- `styles.ts` - Styles using createVariants or StyleSheet
- `IComponentName.ts` - TypeScript interfaces (when needed)
- `useComponentController.ts` - Controller hook for complex logic (when needed)

## Technology Stack

- **Framework**: Expo 54 with React Native 0.81.5 and React 19.1.0
- **Navigation**: React Navigation v7 (native-stack)
- **State Management**: TanStack Query v5 for server state
- **API Client**: Axios with interceptors
- **Form Handling**: React Hook Form v7 with Zod validation
- **Gestures**: React Native Gesture Handler + Reanimated
- **Animations**: Moti (built on Reanimated)
- **UI Components**: Custom components with TypeScript-based variant system
- **Bottom Sheets**: @gorhom/bottom-sheet
- **Icons**: lucide-react-native
- **Fonts**: Host Grotesk (via @expo-google-fonts)
- **Media**: expo-camera, expo-audio, expo-video
- **TypeScript**: Strict mode enabled

## Configuration Notes

- **New Architecture**: Enabled in app.json (`newArchEnabled: true`)
- **Edge-to-Edge**: Android edge-to-edge enabled (`edgeToEdgeEnabled: true`)
- **Safe Area**: SafeAreaProvider wraps the entire app
- **Gesture Handler**: GestureHandlerRootView wraps the app root
- **Query Client**: TanStack Query client wraps AuthProvider
- **Font Loading**: App waits for Host Grotesk fonts to load before rendering
