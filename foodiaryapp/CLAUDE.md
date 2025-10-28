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

- `src/app/` - Application-level code (navigation, configuration)
- `src/ui/` - UI components, screens, and styling
  - `src/ui/components/` - Reusable UI components
  - `src/ui/screens/` - Screen components
  - `src/ui/styles/` - Theme and styling utilities

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@app/*` → `./src/app/*`
- `@ui/*` → `./src/ui/*`

Always use these aliases when importing from these directories.

### Navigation Architecture

The app uses a nested navigation structure with React Navigation:

1. **Root Navigation** (`src/app/navigation/index.tsx`): Main navigation container
2. **AuthStack** (`src/app/navigation/AuthStack.tsx`): Authentication flow with Greetings and Onboarding screens
3. **OnboardingStack** (`src/ui/screens/Onboarding/OnboardingStack.tsx`): Independent nested navigator for onboarding flow

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

### Component Patterns

**Navigation Type Exports**: Each stack exports its own type helpers for screen props and navigation props. When creating a new screen in a stack, use the appropriate type exports:
- `AuthStackScreenProps<'ScreenName'>`
- `OnboardingStackScreenProps<'StepName'>`

**Component Organization**: Components follow this structure:
- `index.tsx` - Main component
- `styles.ts` - Styles using createVariants or StyleSheet
- `IComponentName.ts` - TypeScript interfaces (when needed)
- `useComponentController.ts` - Controller hook for complex logic (when needed)

## Technology Stack

- **Framework**: Expo ~53.0.22 with React Native 0.79.6
- **Navigation**: React Navigation v7 (native-stack)
- **Gestures**: React Native Gesture Handler + Reanimated
- **UI**: Custom components with TypeScript-based variant system
- **Fonts**: Host Grotesk (via @expo-google-fonts)
- **TypeScript**: Strict mode enabled

## Configuration Notes

- **New Architecture**: Enabled in app.json (`newArchEnabled: true`)
- **Edge-to-Edge**: Android edge-to-edge enabled
- **Safe Area**: SafeAreaProvider wraps the entire app
- **Gesture Handler**: GestureHandlerRootView wraps the app root
