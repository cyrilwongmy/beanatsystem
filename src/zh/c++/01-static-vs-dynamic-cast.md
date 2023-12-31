---
title: 0. Static cast vs dynamic cast
author: ChatGPT
---

## What's static cast and dynamic cast? What's the difference?

In C++, `static_cast` and `dynamic_cast` are two different type casting operators used to convert between types. The main difference between them lies in their behavior and the type of conversions they can perform.

1. `static_cast`:
   - `static_cast` is a compile-time cast that is resolved during the compilation process.
   - It can perform implicit conversions, such as numeric conversions (e.g., int to float) or pointer conversions within an inheritance hierarchy.
   - It can also perform explicit type conversions, such as casting between unrelated types, but it is the programmer's responsibility to ensure the correctness of such conversions.
   - `static_cast` does not perform any runtime type checking.
   - It is generally considered safer than C-style casts since it provides more compile-time checks.

2. `dynamic_cast`:
   - `dynamic_cast` is a runtime cast that is resolved during program execution.
   - It is primarily used for handling conversions within an inheritance hierarchy, specifically for casting pointers or references of a base class to derived class pointers or references.
   - It performs a runtime type check to ensure the validity of the conversion. If the conversion is not valid (e.g., if the object being cast is not of the target type), `dynamic_cast` returns a null pointer (for pointers) or throws a `std::bad_cast` exception (for references).
   - `dynamic_cast` is only applicable to polymorphic types, i.e., types that have at least one virtual function.

Here's an example to illustrate the usage of both casts:

```cpp
#include <iostream>

class Base {
public:
    virtual ~Base() {}
};

class Derived : public Base {};

int main() {
    Base* basePtr = new Derived();

    // static_cast example
    Derived* derivedPtr = static_cast<Derived*>(basePtr);

    // dynamic_cast example
    Derived* derivedPtrDyn = dynamic_cast<Derived*>(basePtr);

    if (derivedPtr != nullptr) {
        std::cout << "static_cast: Conversion succeeded." << std::endl;
    }

    if (derivedPtrDyn != nullptr) {
        std::cout << "dynamic_cast: Conversion succeeded." << std::endl;
    }

    delete basePtr;
    return 0;
}
```

In the code above, `static_cast` is used to convert `basePtr` to `Derived*`. Since the object being pointed to is actually of type `Derived`, the conversion succeeds.

Similarly, `dynamic_cast` is used to perform the same conversion. However, in this case, it performs a runtime type check to ensure that the object being pointed to is of the target type. Since it is indeed of type `Derived`, the conversion succeeds.

Both casts have their specific use cases, and understanding their differences and limitations is important for writing correct and maintainable code.


The above content is generated by ChatGPT